import bcrypt from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { notion } from '@/lib/notionClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userName, email, password } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  if (!userName || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  // ユーザー名でNotionデータベースを検索
  const existingUsersResponse = await notion.databases.query({
    database_id: process.env.NOTION_USERS_DATABASE_ID,
    filter: {
      property: 'userName',
      title: {
        equals: userName,
      },
    },
  })

  // メールアドレスでNotionデータベースを検索
  const existingEmailResponse = await notion.databases.query({
    database_id: process.env.NOTION_USERS_DATABASE_ID,
    filter: {
      property: 'email',
      email: {
        equals: email,
      },
    },
  })

  // 既に同じユーザー名が存在する場合はエラーを返す
  if (existingUsersResponse.results.length > 0 && existingEmailResponse.results.length > 0) {
    return res.status(400).json({ message: 'Username already exists' })
  }

  // パスワードのハッシュ化
  const salt = bcrypt.genSaltSync(10)
  const passwordHash = bcrypt.hashSync(password, salt)

  try {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_USERS_DATABASE_ID },
      properties: {
        userName: {
          title: [
            {
              text: {
                content: userName,
              },
            },
          ],
        },
        email: {
          email: email,
        },
        password: {
          rich_text: [
            {
              text: {
                content: passwordHash,
              },
            },
          ],
        },
        authority: {
          select: {
            name: 'guest',
          },
        },
      },
    })

    res.status(200).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Registration failed:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
