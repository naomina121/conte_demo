import axios from 'axios'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { useAuth } from '@/context/auth'
import { Params, BookProps, BookType } from '@/types/type'
import { bookID, bookTitle } from '@/utils/notionData'
import { getNotionPages, getNotionBooks } from '@/utils/notionPost'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userID } = (context.params as Params) || []
  const { results: books }: any = (await getNotionBooks({ userID: userID })) || []
  if (books.length === 0) {
    return {
      props: {
        userID: userID,
        books: [],
        pages: [],
      },
    }
  }
  const { results: pages }: any = (await getNotionPages({ bookID: books[0].id })) || []
  return {
    props: {
      userID: userID,
      books: books,
      pages: pages,
    },
  }
}

const Books: FC<BookProps> = ({ userID, books, pages }) => {
  const { user } = useAuth()
  const router = useRouter()
  const [isPublic, setIsPublic] = useState(false)

  console.log(pages)

  // ログインしていない場合はログインページにリダイレクト
  if (!user) {
    return (
      <Layout>
        <div className='flex justify-center items-center h-full'>
          <div className='text-center mt-40 py-10 px-4 sm:px-6 lg:px-8'>
            <h1 className='block text-6xl font-bold text-gray-800 max-sm:text-3xl'>
              メンバー限定ページです。
            </h1>
            <h1 className='block text-2xl font-bold text-white'></h1>
            <p className='mt-6 text-gray-600 dark:text-gray-600 font-bold'>
              ログインしてページをご確認ください。
            </p>
            <p className='text-gray-600 dark:text-gray-500'>Please log in and check the page.</p>
            <div className='mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3'>
              <a
                className='w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                href='/auth/login'
                target='_blank'
              >
                ログインする
              </a>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // 記事管理を閲覧できる範囲のユーザー以外はリダイレクト
  if (Number(user.id.unique_id.number) !== Number(userID)) {
    router.push('/books/' + Number(user.id.unique_id.number))
  }

  // 削除ボタンを押したときの処理
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    userID: string | number,
    bookID: string,
  ) => {
    e.preventDefault()
    if (confirm('本当に削除しますか？')) {
      await axios
        .post(`/api/books/delete/${userID}/${bookID}`, {
          bookID: bookID,
        })
        .then(() => {
          // ページをリロード
          router.push('/books/' + userID)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked)
  }

  return (
    <Layout>
      <div className='flex w-full h-full justify-center'>
        <div className='mt-10 h-full'>
          <h2 className='text-2xl p-2 my-2 border-l-8 font-sans font-bold border-blue-600 bg-white'>
            教材or学習ブックの新規作成
          </h2>
          <div>
            <Link
              href={'/books/post/' + userID}
              className='w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent bg-gradient-to-r from-purple-600 to-blue-400 hover:opacity-80 text-white disabled:opacity-50 disabled:pointer-events-none'
            >
              本を作成する
            </Link>
          </div>
          {books.length > 0 && (
            <div>
              <h2 className='text-2xl p-2 my-2 mt-4 border-l-8 font-sans font-bold border-blue-600 bg-white'>
                ブック一覧
              </h2>
              <div className='flex flex-col mt-4 max-w-6xl'>
                <div className='-m-1.5 overflow-x-auto'>
                  <div className='p-1.5 min-w-full inline-block align-middle'>
                    <div className='border rounded-lg divide-y divide-gray-200 bg-gray-300'>
                      <div className='py-3 px-4 flex'>
                        <div className='relative max-w-xs'>
                          <label htmlFor='hs-table-search' className='sr-only'>
                            Search
                          </label>
                          <input
                            type='text'
                            name='hs-table-search'
                            id='hs-table-search'
                            className='py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                            placeholder='記事タイトルを検索する'
                          />

                          <div className='absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3'>
                            <svg
                              className='size-4 text-gray-400'
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              stroke-width='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            >
                              <circle cx='11' cy='11' r='8' />
                              <path d='m21 21-4.3-4.3' />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className='overflow-hidden'>
                        <table className='min-w-full divide-y divide-gray-200'>
                          <thead className='bg-gray-700'>
                            <tr>
                              <th
                                scope='col'
                                className='px-6 py-3 text-start text-xs font-medium text-white uppercase'
                              >
                                記事タイトル
                              </th>
                              <th
                                scope='col'
                                className='px-6 py-3 text-start text-xs font-medium text-white uppercase'
                              >
                                編集機能
                              </th>
                              <th
                                scope='col'
                                className='px-6 py-3 text-end text-xs font-medium text-white uppercase'
                              >
                                削除機能
                              </th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-gray-700'>
                            {books.map((book: any) => (
                              <tr key={book.id}>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 underline hover:no-underline'>
                                  <Link
                                    target='_blank'
                                    href={'/books/' + userID + '/' + bookID(book)}
                                  >
                                    {bookTitle(book)}
                                  </Link>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-end text-sm font-medium'>
                                  <Link
                                    href={'/books/edit/' + userID + '/' + bookID(book)}
                                    className='inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-700 hover:text-green-900 disabled:opacity-50 disabled:pointer-events-none '
                                  >
                                    編集する
                                  </Link>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-end text-sm font-medium'>
                                  <button
                                    type='button'
                                    onClick={(e) => {
                                      handleDelete(e, userID, bookID(book))
                                    }}
                                    className='inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                  >
                                    削除する
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Books
