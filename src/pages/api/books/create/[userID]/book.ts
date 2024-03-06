import { NextApiRequest, NextApiResponse } from 'next'
import { notionBookPost } from '@/utils/notionPost'

export default async function handler(req: NextApiRequest | any, res: NextApiResponse | any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '権限がありません' })
  }

  try {
    const data = req.body
    const response = await notionBookPost(data)
    res.status(200).json({ response })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
