import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import students from '../data/students.json'

export default function Login() {
  const { student, login } = useAuth()
  const navigate = useNavigate()

  const [uid, setUid] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (student) {
    return <Navigate to="/dashboard" replace />
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!uid.trim() || !password) {
      setError('Please enter both UID and password.')
      return
    }

    const result = login(uid, password)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message)
    }
  }

  function fillSample(sampleUid, samplePassword) {
    setUid(sampleUid)
    setPassword(samplePassword)
    setError('')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">🎓</span>
          <h1>Activity Points Management System</h1>
          <p>Sign in with your student UID to view and manage your activity points.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="uid">Student UID</label>
          <input
            id="uid"
            type="text"
            placeholder="e.g. 21CS101"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>

       
      </div>
    </div>
  )
}
