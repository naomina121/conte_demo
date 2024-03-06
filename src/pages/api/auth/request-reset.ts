import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { notion } from '@/lib/notionClient'
import { verifyCsrfToken } from '@/utils/csrf'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST' && req.body.email) {
    try {
      const { email } = req.body

      // CSRF トークンの検証
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

      //トークンが有効かどうか
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET が設定されていません')
      }
      // 一時トークンの生成
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })

      // Nodemailer トランスポータの設定
      const transporter = nodemailer.createTransport({
        service: 'gmail', // メールサービスを選択
        auth: {
          user: process.env.EMAIL_USERNAME, // gmailアドレス
          pass: process.env.EMAIL_PASSWORD, // アプリパスワードを使用
        },
      })

      // メールオプションの設定
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'パスワード再設定リンク',
        html: `<p>パスワードを再設定するには、以下のリンクをクリックしてください。</p><p><a href="${process.env.FRONTEND_URL}/auth/reset-password?token=${token}">パスワードを再設定する</a></p>`,
      }

      // メール送信
      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.error('Send Mail Error:', error)
          return res.status(500).end('Email Send Error')
        } else {
          console.log('Email sent: ' + info.response)
          return res.status(200).json({ message: 'パスワード再設定メールを送信しました。' })
        }
      })
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: 'サーバー内部でエラーが発生しました', error: error.message })
    }
  } else if (req.method === 'POST') {
  } else {
    return res.status(405).end()
  }
}
