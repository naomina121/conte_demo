import jwt from 'jsonwebtoken'
import { NextApiRequest } from 'next'
const cookie = require('cookie')

interface NextApiRequestWithUser extends NextApiRequest {
  user?: { [key: string]: any }
}

const isAuthenticated = (req: any, res: any, next: Function) => {
  try {
    // クッキーからトークンを取得
    const token = req.cookies['auth']
    if (!token) {
      return res.status(401).json({ message: 'ログインが必要です' })
    }

    // JWT の検証
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: '権限が無効です。', error: err.message })
      }

      // セキュリティヘッダーを設定
      res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self';")
      res.setHeader('X-Content-Type-Options', 'nosniff')
      res.setHeader('X-Frame-Options', 'DENY')
      res.setHeader('X-XSS-Protection', '1; mode=block')

      // ユーザー情報を取得
      const secretKey = process.env.JWT_SECRET as string
      const user: any = jwt.verify(token, secretKey)
      req.user = user

      next() // 次のミドルウェアまたはルートハンドラーに処理を移行
    })
  } catch (error: any) {
    res.status(500).json({ message: 'サーバー内部でエラーが発生しました。', error: error.message })
  }
}

export default isAuthenticated
