import { NextApiRequest, NextApiResponse } from 'next'
import { notionPagePost } from '@/utils/notionPost'

export default async function handler(req: NextApiRequest | any, res: NextApiResponse | any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '権限がありません' })
  }

  try {
    const data = req.body
    await notionPagePost(data)
    res.status(200).json({ message: 'データを登録しました' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
