import axios from 'axios'
import React, { useState } from 'react'
import Layout from '@/components/Layout'

const PasswordSend = () => {
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data } = await axios.get('/api/auth/csrf-token') // CSRF トークンを取得
      await axios.post(
        '/api/auth/request-reset',
        { email },
        {
          headers: {
            'X-CSRF-Token': data.csrfToken, // ヘッダーにCSRFトークンを設定
          },
        },
      )
      alert('パスワード再設定用のメールを送信しました。ご確認ください。')
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data.message || '何らかの理由で失敗しました。')
      } else {
        setErrorMsg('何らかの理由で失敗しました。')
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
          <button type='submit' className='button px-4 bg-blue-600 text-white'>
            パスワードを再設定する
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default PasswordSend
