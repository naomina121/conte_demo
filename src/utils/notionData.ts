// Notionから取り出す時に短縮した変数として活用する。

import { PageType, RichTextType, UserType } from '@/types/type'

// users
export const userName = (user: UserType) => {
  return getPropertiesRichText(user.properties.userName.title)
}

export const userEmail = (user: UserType) => {
  return user.properties.email.email
}

export const userAuthority = (user: UserType) => {
  return user.properties.authority
}

export const userDisplayName = (user: UserType) => {
  return getPropertiesRichText(user.properties.displayName.rich_text)
}

// books
export const bookID = (book: any) => {
  return book.properties.bookID.unique_id.number
}

export const bookTitle = (book: any) => {
  return getPropertiesRichText(book.properties.bookTitle.title)
}

export const bookTags = (book: any) => {
  return book.properties.tags.multi_select.map((tag: any) => tag.name)
}

export const bookDescription = (book: any) => {
  return getPropertiesRichText(book.properties.description.rich_text)
}

export const bookIsPublic = (book: any) => {
  return book.properties.isPublic.checkbox
}

export const bookCreatedAt = (book: any) => {
  return book.created_time
}

export const bookUpdate = (book: any) => {
  return book.last_edited_time
}

export const bookSrc = (book: any) => {
  return getPropertiesRichText(book.properties.bookSrc.rich_text)
}

// sites
export const siteTitle = (site: any) => {
  return getPropertiesRichText(site.properties.siteTitle.title)
}

export const category = (site: any) => {
  return site.properties.category.select.name ? site.properties.category.select.name : '未分類'
}

export const siteDescription = (site: any) => {
  return getPropertiesRichText(site.properties.description.rich_text)
}

export const siteIsPublic = (site: any) => {
  return site.properties.isPublic.checkbox
}

export const siteCreatedAt = (site: any) => {
  return site.created_time
}

export const siteUpdate = (site: any) => {
  return site.last_edited_time
}

export const siteUserID = (site: any) => {
  return site.properties.userID.rollup.array[0].id
}

export const sitePageUserID = (site: any) => {
  return site.properties.pageUserID
}

export const sitePageID = (site: any) => {
  return site.properties.pageID.relation
}

export const pageSlug = (site: any) => {
  return site.properties.pageSlug.rollup.array[0].formula.string
}

// pages
export const pageTitle = (page: any) => {
  return getPropertiesRichText(page.properties.pageName.rich_text)
}

export const pageDescription = (page: any) => {
  return getPropertiesRichText(page.properties.pageDescription.rich_text)
}

export const pageIsTopPage = (page: any) => {
  return page.properties.isTopPage.checkbox
}

export const pageUserID = (page: any) => {
  return page.properties.userID.rollup.array[0].id
}

export const pageSiteID = (page: any) => {
  return page.properties.siteID.rollup.array[0].id
}

// posts
export const postTitle = (post: any) => {
  return getPropertiesRichText(post.properties.pageTitle.title)
}

export const postContent = (post: any) => {
  return getPropertiesRichText(post.properties.content.rich_text)
}

export const navTitle = (nav: any) => {
  return getPropertiesRichText(nav.properties.navTitle.rich_text)
}

export const introductoryText = (intro: any) => {
  return getPropertiesRichText(intro.properties.introductoryText.rich_text)
}

export const slug = (page: PageType) => {
  return page.properties.slug.formula.string
}

// リッチテキストの取得
export const getPropertiesRichText = (RichTextArr: RichTextType[]) => {
  try {
    const textArr = RichTextArr.map((text) => text.plain_text)
    return textArr.join('')
  } catch (err) {
    // console.error(err)
  }
  return ''
}
