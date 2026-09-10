import React, { createContext, useContext, useEffect, useState } from 'react'
import students from '../data/students.json'

const AuthContext = createContext(null)
const SESSION_KEY = 'apms_logged_in_uid'

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session on page load/refresh
  useEffect(() => {
    const savedUid = localStorage.getItem(SESSION_KEY)
    if (savedUid) {
      const found = students.find((s) => s.uid === savedUid)
      if (found) setStudent(found)
    }
    setLoading(false)
  }, [])

  function login(uid, password) {
    const found = students.find(
      (s) => s.uid.toLowerCase() === uid.trim().toLowerCase()
    )
    if (!found) {
      return { success: false, message: 'UID not found.' }
    }
    if (found.password !== password) {
      return { success: false, message: 'Incorrect password.' }
    }
    setStudent(found)
    localStorage.setItem(SESSION_KEY, found.uid)
    return { success: true }
  }

  function logout() {
    setStudent(null)
    localStorage.removeItem(SESSION_KEY)
  }

  return (
    <AuthContext.Provider value={{ student, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
