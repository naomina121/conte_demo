const { Client } = require('@notionhq/client')
export const notion = new Client({
  auth: process.env.NOTION_API_KEY as String,
})
