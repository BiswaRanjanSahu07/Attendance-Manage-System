import { createContext, useContext, useState } from 'react'
import { authenticate } from '../lib/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('smartattend_user')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })

  function login(username, password) {
    const found = authenticate(username, password)
    if (found) {
      setUser(found)
      localStorage.setItem('smartattend_user', JSON.stringify(found))
      return { success: true, user: found }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('smartattend_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
