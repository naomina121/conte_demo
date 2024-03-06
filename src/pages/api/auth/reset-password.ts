import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { updatePassword } from '@/utils/notionUser'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed')
  }

  const { token, password } = req.body
  try {
    // JWT_SECRETが定義されているか確認
    if (!process.env.JWT_SECRET) {
      throw new Error('JWTが設定されていません')
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET)
    const email = decoded.email

    // 新しいパスワードのハッシュ化
    const hashedPassword = bcrypt.hashSync(password, 10)

    // Notion API を使用してユーザーのパスワードを更新
    await updatePassword({ email, hashedPassword })

    res.status(200).json({ message: 'パスワードが更新されました。' })
  } catch (error) {
    console.error('Password Reset Error:', error)
    res.status(500).json({ message: 'パスワードの更新に失敗しました。' })
  }
}
