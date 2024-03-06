import { notion } from '@/lib/notionClient'

// notionのサイト情報を取得する関数
export const getNotionBooks = async ({
  userID,
  bookID,
  slug,
}: {
  userID?: number | string
  bookID?: number | string
  slug?: string | number
}) => {
  try {
    const and: any = []
    if (userID) {
      and.push({
        property: 'userID',
        rollup: {
          number: { equals: userID },
        },
      })
    }

    if (bookID) {
      and.push({
        property: 'bookID',
        rollup: {
          number: { equals: bookID },
        },
      })
    }

    if (slug) {
      and.push({
        property: 'slug',
        rollup: {
          array: { contains: slug },
        },
      })
    }

    //notionのユーザーデータベースからユーザー情報を取得
    const data = []
    let cursor: string | undefined = undefined

    while (true) {
      const { results, next_cursor, has_more }: any = await notion.databases.query({
        database_id: process.env.NOTION_BOOKS_DATABASE_ID,
        start_cursor: cursor,
        and: and,
      })
      data.push(...results)
      // has_moreがfalseになったら終了
      if (!has_more) break
      cursor = next_cursor
    }
    return { results: data }
  } catch (error) {
    console.error('ブックがみつかりません', error)
  }
}

// notionのページ情報を取得する関数
export const getNotionPages = async ({ bookID }: { bookID: number | string | undefined }) => {
  try {
    const and: any = []
    if (bookID) {
      and.push({
        property: 'Books',
        relation: {
          contains: bookID,
        },
      })
    }
    //notionのサイトのデーターベースからサイト情報を取得
    let cursor = undefined
    const data = []

    while (true) {
      const { results, next_cursor, has_more }: any = await notion.databases.query({
        database_id: process.env.NOTION_PAGES_DATABASE_ID,
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
  } catch (error) {
    console.error('Notion pages fetch failed', error)
  }
}

// notionのブックとして投稿する関数
export const notionBookPost = async (data: any) => {
  try {
    // notionのユーザーデータベースからユーザー情報を取得
    const { results: userResults } = await notion.databases.query({
      database_id: process.env.NOTION_USERS_DATABASE_ID,
      filter: {
        property: 'id',
        unique_id: {
          equals: Number(data.userID),
        },
      },
    })

    await notion.pages.create({
      parent: { database_id: process.env.NOTION_BOOKS_DATABASE_ID },
      properties: {
        isPublic: { checkbox: data.isPublic },
        bookTitle: { title: [{ type: 'text', text: { content: data.bookTitle } }] },
        description: { rich_text: [{ type: 'text', text: { content: data.description } }] },
        tags: { multi_select: [...data.tags] },
        bookSrc: { rich_text: [{ type: 'text', text: { content: data.bookSrc } }] },
        Users: { relation: [{ id: userResults[0].id }] },
      },
    })

    const { results: books } = await notion.databases.query({
      database_id: process.env.NOTION_BOOKS_DATABASE_ID,
      filter: {
        property: 'bookTitle',
        title: {
          equals: data.bookTitle,
        },
      },
    })

    return books[0].properties.bookID.unique_id.number
  } catch (error: any) {
    console.error('投稿できませんでした', error)
  }
}

// notionのページを投稿する関数
export const notionPagePost = async (data: any) => {
  try {
    //notionのサイトのデーターベースからサイト情報を取得
    const { results: bookResults } = await notion.databases.query({
      database_id: process.env.NOTION_BOOKS_DATABASE_ID,
      filter: {
        property: 'bookTitle',
        title: {
          equals: data.bookTitle,
        },
      },
    })

    const content = data.content ? data.content : 'test'
    const pageTitle = data.pageTitle ? data.pageTitle : '無題'
    const slug = data.slug ? data.slug : '1'

    await notion.pages.create({
      parent: { database_id: process.env.NOTION_PAGES_DATABASE_ID },
      properties: {
        pageTitle: { title: [{ type: 'text', text: { content: pageTitle } }] },
        Books: { relation: [{ id: bookResults[0].id }] },
        slug: { rich_text: [{ type: 'text', text: { content: slug } }] },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content: content } }],
          },
        },
      ],
    })
  } catch (error) {
    console.error('Notion page post failed', error)
  }
}

// notionのブックの情報を更新する関数
export const notionBookUpdate = async (data: any) => {
  try {
    const { results: bookResults } = await notion.databases.query({
      database_id: process.env.NOTION_BOOKS_DATABASE_ID,
      filter: {
        property: 'bookID',
        unique_id: {
          equals: Number(data.bookID),
        },
      },
    })
    await notion.pages.update({
      page_id: bookResults[0].id,
      properties: {
        isPublic: { checkbox: data.isPublic },
        bookTitle: { title: [{ type: 'text', text: { content: data.bookTitle } }] },
        description: { rich_text: [{ type: 'text', text: { content: data.description } }] },
        tags: { multi_select: [...data.tags] },
        bookSrc: { rich_text: [{ type: 'text', text: { content: data.bookSrc } }] },
      },
    })
  } catch (error) {
    console.error('Notion update failed', error)
  }
}

// notionのブックとそれに紐づくページを削除する関数
export const notionBookDelete = async (data: any) => {
  try {
    const { results: bookResults } = await notion.databases.query({
      database_id: process.env.NOTION_BOOKS_DATABASE_ID,
      filter: {
        property: 'bookID',
        unique_id: {
          equals: Number(data.bookID),
        },
      },
    })

    const { results: pageResults } = await notion.databases.query({
      database_id: process.env.NOTION_PAGES_DATABASE_ID,
      filter: {
        property: 'Books',
        relation: {
          contains: bookResults[0].id,
        },
      },
    })

    await notion.pages.update({
      page_id: bookResults[0].id,
      archived: true,
    })

    pageResults.map(async (page: any) => {
      await notion.pages.update({
        page_id: page.id,
        archived: true,
      })
    })
  } catch (error) {
    console.error('Notion delete failed', error)
  }
}
