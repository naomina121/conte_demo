import { NextApiRequest, NextApiResponse } from 'next'
const cookie = require('cookie')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      // 認証クッキーをクリア
      res.setHeader('Set-Cookie', [
        cookie.serialize('auth', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: -1, // すぐに期限切れ
          sameSite: 'strict',
          path: '/',
        }),
        // CSRF トークンクッキーもクリアする場合
        cookie.serialize('csrfToken', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: -1, // すぐに期限切れ
          sameSite: 'strict',
          path: '/',
        }),
      ])

      return res.status(200).json({ message: 'ログアウトしました' })
    } else {
      // POST 以外のメソッドに対するレスポンス
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error: any) {
    // エラーハンドリング
    res.status(500).json({ message: 'サーバー内部エラーが発生しました', error: error.message })
  }
}
