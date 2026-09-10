import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Navbar from './components/Navbar.jsx'

import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ActivityList from './pages/ActivityList.jsx'
import ActivityDetails from './pages/ActivityDetails.jsx'
import AddActivity from './pages/AddActivity.jsx'
import Categories from './pages/Categories.jsx'
import Profile from './pages/Profile.jsx'

// HashRouter is used so the app works reliably on GitHub Pages
// (static hosting) without needing extra server-side rewrite rules.
export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activities"
              element={
                <ProtectedRoute>
                  <ActivityList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activities/:id"
              element={
                <ProtectedRoute>
                  <ActivityDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-activity"
              element={
                <ProtectedRoute>
                  <AddActivity />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </HashRouter>
    </AuthProvider>
  )
}
