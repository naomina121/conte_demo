import { notion } from '@/lib/notionClient'

// 特定のユーザー情報を取得する関数を作成
export const fetchUser = async ({ id }: { id: string | number }) => {
  // 条件定義用 初期設定は公開するものだけフィルタリング
  const and: any = []

  // idが存在したらフィルタリング
  if (id) {
    and.push({
      property: 'id',
      number: {
        equals: id,
      },
    })
  }

  // 取得するデータベースのID（＝ページID）を定義する
  let cursor: string | undefined = undefined
  const databaseId = process.env.NOTION_USERS_DATABASE_ID as string
  const data = []

  while (true) {
    const { results, next_cursor, has_more }: any = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: and,
      },
      start_cursor: cursor,
    })
    data.push(...results)
    // has_moreがfalseになったら終了
    if (!has_more) break
    cursor = next_cursor
  }
  return { results: data }
}

// 特定のユーザーのパスワードを更新する関数を作成
export const updatePassword = async ({
  email,
  hashedPassword,
}: {
  email: string
  hashedPassword: string
}) => {
  // NotionデータベースからEmailでユーザーを検索
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_USERS_DATABASE_ID,
    filter: {
      property: 'email',
      email: {
        equals: email,
      },
    },
  })

  // Notionデータベースからユーザーを検索
  const response = await notion.pages.update({
    page_id: results[0].id,
    properties: {
      password: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: hashedPassword,
            },
          },
        ],
      },
    },
  })
  return response
}
