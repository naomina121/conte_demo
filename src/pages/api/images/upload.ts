import fs from 'fs'
import path from 'path'
import formidable, { File, IncomingForm } from 'formidable-serverless'
import { NextApiRequest, NextApiResponse } from 'next'

// ファイルのアップロード処理
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest | File | Date, res: NextApiResponse) {
  const form = new IncomingForm()
  form.uploadDir = './public/images'
  form.keepExtensions = true
  form.parse(req, (err, fields, files: { [key: string]: any }) => {
    if (err) {
      res.status(500).json({ error: 'ファイルのアップロード中にエラーが発生しました' })
      return
    }

    const file = files.file
    if (!file) {
      res.status(400).json({ error: 'ファイルが見つかりません' })
      return
    }

    // アップロードされたファイルをpublic/imagesに移動
    const newPath = path.join(process.cwd(), 'public','images', file.name)
    fs.rename(file.path, newPath, (err) => {
      if (err) {
        res.status(500).json({ error: 'ファイルの保存中にエラーが発生しました' })
        return
      }
      res.status(200).json({ message: 'ファイルが正常にアップロードされました' })
      return
    })
  })
}
