import axios from 'axios'
import { useRouter } from 'next/router'
import React, { ReactNode, useContext, useEffect, useState } from 'react'

interface User {
  id: any
  userName: string
  email: string
  authority: string
  displayName: string | null
}

interface AuthContextType {
  user: User | null
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = React.createContext<AuthContextType>({ user: null, logout: () => {} })

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  const fetchUserInfo = async () => {
    try {
      const { data } = await axios.get('/api/auth/users')
      setUser(data.user.userData)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // 401 Unauthorized の場合は、特に何もせずに処理を終了
        console.error('認証が必要です。')
      } else {
        // 401以外のエラーの場合は、ログアウト処理をトリガー
        console.error('認証エラー:', error)
        logout()
      }
    }
  }

  // ページ読み込み時にユーザー情報を取得
  useEffect(() => {
    fetchUserInfo()
  }, [])

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout') // サーバーサイドでログアウト処理
      setUser(null)
      router.push('/auth/login')
    } catch (error) {
      console.error('ログアウトができませんでした:', error)
    }
  }

  const value = { user, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
