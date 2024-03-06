import { ParsedUrlQuery } from 'querystring'
import { Url } from 'next/dist/shared/lib/router/router'

//UsersTypeの型定義
export type UserType = {
  properties: UserPropertyType
}

export type UserPropertyType = {
  id: number | string
  email: { email: string }
  password?: { rich_text: RichTextType[] }
  userName: { title: RichTextType[] }
  authority: 'admin' | 'user | guest'
  displayName: { rich_text: RichTextType[] }
}

//SiteTypeの型定義
export type BookType = {
  properties: BookPropertyType
}

export type BookPropertyType = {
  siteID: number | string
  isPublic: boolean
  siteTitle: { title: RichTextType[] }
  description: { rich_text: RichTextType[] }
  createdAt: string
  update: string
  userID: {
    rollup: {
      array: {
        id: string | number
      }[]
    }
  }
  pageUserID: number
}

//PageTypeの型定義
export type PageType = {
  properties: PagePropertyType
}

export type PagePropertyType = {
  pageID: number | string
  siteID: {
    rollup: {
      array: {
        siteID: string | number
      }[]
    }
  }
  title: {
    pageTitle: RichTextType[]
  }
  description: { rich_text: RichTextType[] }
  isTopPage: boolean
  userID: {
    rollup: {
      array: {
        pageUserID: string | number
      }[]
    }
  }
  pageName: { rich_text: RichTextType[] }
  navTitle: { rich_text: RichTextType[] }
  introductoryText: { rich_text: RichTextType[] }
  slug: {
    formula: {
      string: Url
    }
  }
}

// RichTextTypeの型定義
export type RichTextType = {
  type: string
  text?: {
    content: string
    link: null | {
      url: string
    }
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: null | string
}

//blockTypeの型定義
export type BlockType = {
  type: string
  heading_2?: {
    is_toggleable: boolean
    color: string
    rich_text: RichTextType[]
  }
  heading_3?: {
    is_toggleable: boolean
    color: string
    rich_text: RichTextType[]
  }
  image?: {
    caption: []
    type: string
    file?: {
      url: string
      expiry_time: Date
    }
    external?: {
      url: string
    }
  }
  paragraph?: {
    rich_text: RichTextType[]
    color: string
  }
  code?: {
    caption: []
    rich_text: RichTextType[]
    language: string
  }
  bulleted_list_item?: {
    rich_text: RichTextType[]
    color: string
    children?: [{ type: string }, { bulleted_list_item: BlockType['bulleted_list_item'] }]
  }
  numbered_list_item?: {
    rich_text: RichTextType[]
    color: string
    children?: [{ type: string }, { numbred_list_item: BlockType['numbered_list_item'] }]
  }
  quote?: {
    rich_text: RichTextType[]
    color: string
    children?: [
      { type?: string },
      {
        quote: BlockType['quote']
      },
    ]
  }
  toggle?: {
    rich_text: RichTextType[]
    color: string
    children?: [
      { type?: string },
      {
        paragraph?: BlockType['paragraph']
      },
    ]
  }
  callout?: {
    rich_text: RichTextType[]
    color: string
    icon?: {
      emoji: string
    }
  }
  video?: {
    caption?: []
    type: string
    file?: {
      url: string
      expiry_time: Date
    }
    external?: {
      url: string
    }
  }
  divider?: {
    type: string
  }
  embed?: {
    url: string
  }
  table?: {
    table_width: number
    has_column_header: boolean
    has_row_header: boolean
  }
  table_row?: {
    cells: any
  }
}

// userPropsの型定義
export type UserProps = {
  userID: string | number
}

// sitePropsの型定義
export type BookProps = {
  userID: string | number
  books: BookType[]
  pages: PageType[]
}

export type BookPostProps = {
  userID: string | number
}

export type BookEditProps = {
  userID: string | number
  bookID: string | number
  books: BookType[]
  pages: PageType[] | any
}

export type pagePros = {
  userID: string | number
  books: BookType[]
  topPages: PageType[]
  pages: PageType[]
  id: string | number
}

export type Params = ParsedUrlQuery & {
  id?: string | number
  userID?: string | number
  bookID?: string | number
}
