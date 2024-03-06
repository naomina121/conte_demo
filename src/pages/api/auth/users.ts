import { NextApiRequest, NextApiResponse } from 'next'
import isAuthenticated from '../middlewares/isAuthenticated'

export default async function handler(req: NextApiRequest | any, res: NextApiResponse | any) {
  // ミドルウェアの適用
  isAuthenticated(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: '権限がありません' })
    }

    //リクエストボディからユーザー情報を取得
    const user = req.user

    try {
      if (!user) {
        return res.status(400).json({ message: 'ユーザー情報が存在しません' })
      }

      res.status(200).json({ user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'サーバー内部がエラーを起こしています' })
    }
  })
}
