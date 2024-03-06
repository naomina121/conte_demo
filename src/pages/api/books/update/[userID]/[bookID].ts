import { NextApiRequest, NextApiResponse } from 'next'
import { notionBookUpdate } from '@/utils/notionPost'

export default async function handler(req: NextApiRequest | any, res: NextApiResponse | any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '権限がありません' })
  }

  try {
    const data = req.body
    await notionBookUpdate(data)
    res.status(200).json({ message: '更新されました' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
