import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization?.split(' ')[1] // "Bearer TOKEN"形式を想定
    if (!token) {
      throw new Error('Token not found')
    }

    // JWTの検証
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error('Failed to authenticate token')
      }

      // トークンが有効であれば保護されたデータを送信
      res.status(200).json({ data: 'This is protected data' })
    })
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
