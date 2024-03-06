import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { notion } from '../../../lib/notionClient'
import { verifyCsrfToken } from '@/utils/csrf'
const cookie = require('cookie')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      // CSRF トークンの検証
      const { email, password } = req.body
      const csrfToken = req.headers['x-csrf-token']
      const tokenFromCookie = req.cookies['csrfToken']
      if (!verifyCsrfToken(csrfToken, tokenFromCookie)) {
        throw new Error('CSRF トークンが無効です。')
      }

      // Notionデータベースからユーザーを検索
      const { results } = await notion.databases.query({
        database_id: process.env.NOTION_USERS_DATABASE_ID,
        filter: {
          property: 'email',
          email: {
            equals: email,
          },
        },
      })

      const user = results[0]
      if (!user) {
        throw new Error('ユーザーは存在しません')
      }

      // パスワードを検証
      const hashedPassword = user.properties.password.rich_text[0].plain_text
      const isValid = bcrypt.compareSync(password, hashedPassword)
      if (!isValid) {
        throw new Error('パスワードが間違っています')
      }

      // JWT_SECRETが定義されているか確認
      if (!process.env.JWT_SECRET) {
        throw new Error('JWTが設定されていません')
      }

      const userData = {
        id: user.properties.id,
        userName: user.properties.userName.title[0].plain_text,
        email: user.properties.email.email,
        authority: user.properties.authority.select.name,
        displayName: user.properties.displayName.rich_text.plain_text,
      }

      // JWTの生成
      const jwt = sign({ userData }, process.env.JWT_SECRET, { expiresIn: '1h' })

      res.setHeader('Set-Cookie', [
        cookie.serialize('auth', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60, // 1時間
          sameSite: 'strict',
          path: '/',
        }),
        // ログイン成功またはエラー時にCSRFトークンをクリア
        cookie.serialize('csrfToken', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: -1, // すぐに期限切れ
          sameSite: 'strict',
          path: '/',
        }),
      ])

      return res.status(200).json({ message: 'ログイン成功' })
    } else {
      // POST 以外のメソッドに対するレスポンス
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error: any) {
    // エラー時にもCSRFトークンをクリア
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('csrfToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: -1, // すぐに期限切れ
        sameSite: 'strict',
        path: '/',
      }),
    )
    res.status(500).json({ message: error.message })
  }
}
