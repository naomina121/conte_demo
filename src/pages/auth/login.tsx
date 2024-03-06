import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import Layout from '@/components/Layout'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data } = await axios.get('/api/auth/csrf-token') // CSRF トークンを取得
      await axios.post(
        '/api/auth/login',
        { email, password },
        {
          headers: {
            'X-CSRF-Token': data.csrfToken, // ヘッダーにCSRFトークンを設定
          },
        },
      )
      window.location.href = '/'
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data.message || 'ログインに失敗しました')
      } else {
        setErrorMsg('ログインに失敗しました')
      }
    }
  }

  return (
    <Layout>
      <div className='min-h-screen flex items-center justify-center'>
        {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='email' className='block'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='input border-2 border-gray-200 rounded-md w-full'
            />
          </div>
          <div>
            <label htmlFor='password' className='block'>
              Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='input border-2 border-gray-200 rounded-md w-full'
            />
          </div>
          <button
            type='submit'
            className='w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
          >
            ログイン
          </button>
          <p>
            もしかしてパスワードをお忘れですか？{' '}
            <Link href='/auth/password-send' className='font-bold text-blue-600'>
              パスワードの再設定
            </Link>
            を行いますか？
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default SignIn
