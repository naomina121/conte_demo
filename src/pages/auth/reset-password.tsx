import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '@/components/Layout'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { token } = router.query

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/reset-password', { token, password })
      alert('パスワードが更新されました。')
      router.push('/auth/login')
    } catch (error) {
      console.error('パスワード更新エラー', error)
      alert('パスワードの更新に失敗しました。')
    }
  }

  return (
    <Layout>
      <div className='flex justify-center items-center w-full h-full'>
        <form onSubmit={handleSubmit}>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='新しいパスワード'
            required
            className='block border-2 border-gray-200 rounded-md w-full mb-4'
          />
          <button type='submit' className='button bg-blue-600 p-2 text-white'>
            パスワードを更新する
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ResetPassword
