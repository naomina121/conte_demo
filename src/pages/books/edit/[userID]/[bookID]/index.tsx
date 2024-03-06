import axios from 'axios'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useRef, useState } from 'react'
import InputImage from '@/components/InputImage'
import Layout from '@/components/Layout'
import { useAuth } from '@/context/auth'
import { useGetImageUrl } from '@/hook/useGetImageUrl'
import { BookEditProps, Params } from '@/types/type'
import { bookDescription, bookIsPublic, bookSrc, bookTags, bookTitle } from '@/utils/notionData'
import { getNotionBooks, getNotionPages } from '@/utils/notionPost'

const IMAGE_ID = 'imageId'
const FIELD_SIZE = 210

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userID, bookID } = (context.params as Params) || []
  const { results: books }: any = (await getNotionBooks({ userID: userID, bookID: bookID })) || []
  const { results: pages }: any = (await getNotionPages({ bookID: books[0].id })) || []
  return {
    props: {
      userID: userID,
      bookID: bookID,
      books: books[0],
      pages: pages,
    },
  }
}

const BookEdit: FC<BookEditProps> = ({ userID, bookID, books, pages }) => {
  const { user } = useAuth()
  const router = useRouter()
  const [tags, setTags] = useState<string[]>(Object.values(bookTags(books)))
  const [input, setInput] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageFile, setImageFile] = useState<File | null | any>(null)
  const [bookFormData, setBookFormData] = useState({
    bookTitle: bookTitle(books),
    description: bookDescription(books),
    isPublic: bookIsPublic(books),
    bookSrc: bookSrc(books),
    tags: [bookTags(books)],
    userID: userID,
  })

  console.log(pages)
  // public
  const [isPublic, setIsPublic] = useState(bookIsPublic(books))

  // 画像のURLを取得
  const { imageUrl } = useGetImageUrl({ file: imageFile })

  // ログインしていない場合はログインページにリダイレクト
  if (!user) {
    return (
      <Layout>
        <div className='flex justify-center items-center h-full'>
          <div className='text-center mt-40 py-10 px-4 sm:px-6 lg:px-8'>
            <h2 className='block text-6xl font-bold text-gray-800 max-sm:text-3xl'>
              メンバー限定ページです。
            </h2>
            <p className='mt-6 text-gray-600 dark:text-gray-600 font-bold'>
              ログインしてページをご確認ください。
            </p>
            <p className='text-gray-600 dark:text-gray-500'>Please log in and check the page.</p>
            <div className='mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3'>
              <Link
                href='/auth/login'
                className='w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
              >
                ログインする
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // 記事管理を編集できる範囲のユーザー以外はリダイレクト
  if (Number(user.id.unique_id.number) !== Number(userID)) {
    router.push('/books/' + Number(user.id.unique_id.number))
  }

  //各フォームの変更を検知してstateを更新
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookFormData({ ...bookFormData, [e.target.name]: e.target.value })
  }

  // マルチタグの設定
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    if (e.target.value.endsWith(' ') || e.target.value.endsWith('　')) {
      const newTag = e.target.value.trim()
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag])
      }
      setInput('')
    }
  }

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove))
  }

  // ファイルの設定
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files && e.currentTarget.files[0]) {
      const targetFile = e.currentTarget.files[0]
      setImageFile(targetFile)
    }
  }

  // 画像のキャンセルの設定
  const handleClickCancelButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setImageFile(null)
    // <input />タグの値をリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (imageFile !== null) {
        const formData = new FormData()
        const file = imageFile
        const blob = file.slice(0, file.size, file.type)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const newFile = new File([blob], userID + '-' + uniqueSuffix + '-' + file.name, {
          type: file.type,
        })
        formData.append('file', newFile)
        const response = await fetch('/api/images/upload', {
          method: 'POST',
          body: formData,
        })
        if (response.status === 200) {
          console.log('画像がアップロードされました')
          bookFormData.bookSrc = newFile.name
        } else {
          console.log('アップロードに失敗しました')
          throw new Error('アップロードに失敗しました')
        }
      }

      if (tags.length > 0) {
        for (let i = 0; i < tags.length; i++) {
          bookFormData.tags[i] = { name: tags[i] }
        }
      } else {
        bookFormData.tags[0] = { name: '未分類' }
      }

      const bookData = {
        bookTitle: bookFormData.bookTitle,
        description: bookFormData.description,
        isPublic: isPublic,
        bookSrc: bookFormData.bookSrc,
        tags: bookFormData.tags,
        userID: bookFormData.userID,
        bookID: bookID,
      }

      await axios.post('/api/books/update/' + userID + '/' + bookID, {
        bookTitle: bookFormData.bookTitle,
        description: bookFormData.description,
        isPublic: isPublic,
        bookSrc: bookFormData.bookSrc,
        tags: bookFormData.tags,
        userID: bookFormData.userID,
        bookID: bookID,
      })

      alert('更新が完了しました')
      router.push('/books/edit/' + userID + '/' + bookID)
    } catch (error) {
      console.error('Registration failed', error)
    }
  }
  // チェックボックスの設定
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked)
  }

  return (
    <Layout>
      <div className='w-full h-full max-w-6xl mx-auto mt-10'>
        <div className='w-full h-full'>
          <h2 className='w-full text-2xl p-2 my-2 border-l-8 font-sans font-bold border-blue-600 bg-white'>
            ブックの編集
          </h2>
          <form onSubmit={handleSubmit}>
            <label className='flex my-4'>
              <input
                v-model='isCheck'
                type='checkbox'
                id='isPublic'
                checked={isPublic}
                onChange={handleCheckboxChange}
                className='peer sr-only'
              />
              <span className='h-[1.2em] text-green-800 font-bold'>ブックを公開する</span>
              <span
                className='block w-[2em] cursor-pointer bg-gray-500 rounded-full
      p-[1px] after:block after:h-[1em] after:w-[1em] after:rounded-full
      after:bg-white after:transition peer-checked:bg-green-600
      peer-checked:after:translate-x-[calc(100%-2px)]'
              ></span>
            </label>
            <div className='flex rounded-lg shadow-sm my-4 w-full'>
              <span className='px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-600 text-sm text-gray-200 '>
                ブック名
              </span>
              <input
                type='text'
                name='bookTitle'
                onChange={handleChange}
                defaultValue={bookFormData.bookTitle}
                placeholder='ブック名'
                className='py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
              />
            </div>
            <div className='flex rounded-lg shadow-sm my-4'>
              <span className='px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-600 text-sm text-gray-200 '>
                ディスクリプション
              </span>
              <input
                type='text'
                name='description'
                value={bookFormData.description}
                onChange={handleChange}
                placeholder='ディスクリプション'
                className='py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
              />
            </div>
            <div className='flex rounded-lg shadow-sm my-4'>
              <span className='px-4 py-2 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-600 text-sm text-gray-200 '>
                タグ
              </span>
              {tags.map((tag, index) => (
                <div key={index} className='bg-blue-400 py-0 flex items-center pr-2 px-2'>
                  <span className='text-white text-xs'>{tag}</span>
                  <button
                    type='button'
                    onClick={() => removeTag(index)}
                    className='ml-2 text-white rounded-full text-sm p-1'
                  >
                    &times;
                  </button>
                </div>
              ))}
              <input
                type='text'
                value={input}
                name='tags'
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key == 'Backspace' || e.key == 'Delete') {
                    removeTag(tags.length - 1)
                  }
                }}
                className='flex-1 px-4 border-none outline-none p-1'
                placeholder='タグを入力（タグの最後に空白を入れて下さい）'
              />
            </div>
            <div className='flex rounded-lg bg-white shadow-sm my-4'>
              <span className='px-4 py-2 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-600 text-sm text-gray-200 '>
                カバー画像を設定する
              </span>
              <label
                htmlFor={IMAGE_ID}
                className={
                  'border-white-3px-dotted w-[' +
                  FIELD_SIZE +
                  'px] h-[' +
                  FIELD_SIZE +
                  'px] flex justify-center items-center overflow-hidden cursor-pointer bg-sky-200'
                }
              >
                {imageUrl && imageFile ? (
                  <Image
                    src={imageUrl}
                    alt='アップロード画像'
                    width={FIELD_SIZE}
                    height={FIELD_SIZE}
                    className='object-cover w-full h-full'
                  />
                ) : bookFormData.bookSrc ? (
                  <Image
                    src={'/images/' + bookFormData.bookSrc}
                    alt='アップロード画像'
                    width={FIELD_SIZE}
                    height={FIELD_SIZE}
                    className='object-cover w-full h-full'
                  />
                ) : (
                  '+ 画像をアップロード'
                )}
                {/* ダミーインプット: 見えない */}
                <InputImage ref={fileInputRef} id={IMAGE_ID} onChange={handleFileChange} />
              </label>

              <div style={{ height: 20 }} />
              {/* キャンセルボタン */}
              <button
                className='font-bold bg-gray-200 p-4'
                onClick={(e) => handleClickCancelButton(e)}
              >
                キャンセル
              </button>
            </div>

            <button
              type='submit'
              className='w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent bg-gradient-to-r from-purple-600 to-blue-400 hover:opacity-80 text-white disabled:opacity-50 disabled:pointer-events-none'
            >
              本を更新する
            </button>
          </form>
          <h2 className='w-full text-2xl p-2 my-2 mt-6 border-l-8 font-sans font-bold border-blue-600 bg-white'>
            ページの編集
          </h2>
          {pages &&
            pages.map((page: any, index: number) => {
              return (
                <div key={index} className='flex w-full justify-between items-center my-4'>
                  <div className='flex items-center'>
                    <span className='text-gray-600 dark:text-gray-400 font-bold'>{index + 1}.</span>
                    <Link
                      href={'/books/' + userID + '/' + bookID + '/' + page.id}
                      className='text-blue-600 dark:text-blue-400 font-bold ml-2'
                    >
                      {page.properties.pageTitle.title[0].plain_text}
                    </Link>
                  </div>
                  <div className='flex items-center'>
                    <Link
                      href={'/books/' + userID + '/' + bookID + '/' + page.id}
                      className='text-blue-600 dark:text-blue-400 font-bold ml-2'
                    >
                      編集
                    </Link>
                    <button
                      onClick={(e) => handleDelete(e, userID, bookID, page.id)}
                      className='text-red-600 dark:text-red-400 font-bold ml-2'
                    >
                      削除
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </Layout>
  )
}

export default BookEdit
