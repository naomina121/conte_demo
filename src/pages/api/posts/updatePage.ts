import { NextApiRequest, NextApiResponse } from 'next'
import { notion } from '@/lib/notionClient'

export default async function handler(req: NextApiRequest | any, res: NextApiResponse | any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '権限がありません' })
  }

  try {
    const data = req.body(async () => {
      const response = await notion.pages.update({
        page_id: data.pageID,
        properties: data.properties,
      })
    })()

    res.status(200).json({ message: 'データを登録しました' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
