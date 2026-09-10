import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { getActivitiesForStudent } from '../utils/activityStore.js'
import categories from '../data/categories.json'

export default function Profile() {
  const { student } = useAuth()
  const [activities, setActivities] = useState([])

  useEffect(() => {
    if (student) {
      setActivities(getActivitiesForStudent(student.uid))
    }
  }, [student])

  const approved = activities.filter((a) => a.status === 'Approved')
  const pending = activities.filter((a) => a.status === 'Pending')
  const rejected = activities.filter((a) => a.status === 'Rejected')

  const totalApproved = approved.reduce(
    (sum, a) => sum + Number(a.pointsApproved || 0),
    0
  )

  const byCategory = categories.map((c) => ({
    ...c,
    points: activities
      .filter((a) => a.category === c.id && a.status === 'Approved')
      .reduce((sum, a) => sum + Number(a.pointsApproved || 0), 0),
  }))

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Student Profile</h1>
          <p className="muted">Basic information and overall activity points summary.</p>
        </div>
      </div>

      <div className="two-col">
        <div className="card profile-card">
          <div className="profile-avatar">
            {student.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <h2>{student.name}</h2>
          <p className="muted">{student.uid}</p>

          <table className="info-table">
            <tbody>
              <tr>
                <td>Department</td>
                <td>{student.department}</td>
              </tr>
              <tr>
                <td>Semester</td>
                <td>{student.semester}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{student.email}</td>
              </tr>
              <tr>
                <td>Target Points</td>
                <td>{student.targetPoints}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2>Activity Summary</h2>
          <div className="stats-grid stats-grid-compact">
            <div className="stat-card">
              <span className="stat-label">Total Activities</span>
              <span className="stat-value">{activities.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Approved</span>
              <span className="stat-value">{approved.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Pending</span>
              <span className="stat-value">{pending.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Rejected</span>
              <span className="stat-value">{rejected.length}</span>
            </div>
          </div>

          <h3 className="section-subtitle">Points Earned by Category</h3>
          <ul className="simple-list">
            {byCategory.map((c) => (
              <li key={c.id}>
                <div>
                  <strong>
                    {c.icon} {c.name}
                  </strong>
                </div>
                <span>{c.points} pts</span>
              </li>
            ))}
          </ul>

          <div className="total-points-banner">
            Total Approved Points: <strong>{totalApproved}</strong> / {student.targetPoints}
          </div>
        </div>
      </div>
    </div>
  )
}
