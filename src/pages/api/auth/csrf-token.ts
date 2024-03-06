import { NextApiRequest, NextApiResponse } from 'next'
import { generateCsrfToken } from '@/utils/csrf'
const cookie = require('cookie')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // CSRF トークンを生成し、クッキーにセット
    const csrfToken = generateCsrfToken()
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('csrfToken', csrfToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60, // 1時間
        sameSite: 'strict',
        path: '/',
      }),
    )
    return res.status(200).json({ csrfToken })
  }
}
