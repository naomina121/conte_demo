import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from '@/components/Layout'

const Register: React.FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register', formData)
      alert('登録が完了しました')
      router.push('/auth/login')
    } catch (error) {
      console.error('Registration failed', error)
    }
  }
  return (
    <Layout>
      <div className='container mx-auto p-4 max-w-lg'>
        <h1 className='text-2xl font-bold mb-4'>新規登録</h1>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 mx-auto'>
          <input
            type='text'
            name='userName'
            value={formData.userName}
            onChange={handleChange}
            placeholder='氏名'
            required
            className='input'
          />
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
            required
            className='input'
          />
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='パスワード'
            required
            className='input'
          />
          <button
            type='submit'
            className='button bg-blue-900 text-white w-[120px] mx-auto py-1 text-sm'
          >
            登録する
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Register
