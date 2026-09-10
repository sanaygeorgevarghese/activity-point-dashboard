import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getActivitiesForStudent } from '../utils/activityStore.js'
import categories from '../data/categories.json'

export default function Dashboard() {
  const { student } = useAuth()
  const [activities, setActivities] = useState([])

  useEffect(() => {
    if (student) {
      setActivities(getActivitiesForStudent(student.uid))
    }
  }, [student])

  const totalApproved = activities
    .filter((a) => a.status === 'Approved')
    .reduce((sum, a) => sum + Number(a.pointsApproved || 0), 0)

  const pendingCount = activities.filter((a) => a.status === 'Pending').length
  const remaining = Math.max(student.targetPoints - totalApproved, 0)
  const progressPct = Math.min(
    Math.round((totalApproved / student.targetPoints) * 100),
    100
  )

  const recentActivities = activities.slice(0, 4)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Welcome, {student.name.split(' ')[0]} 👋</h1>
          <p className="muted">
            {student.department} • Semester {student.semester}
          </p>
        </div>
        <Link to="/add-activity" className="btn btn-primary">
          + Add Activity
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Points Earned</span>
          <span className="stat-value">{totalApproved}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Target Points</span>
          <span className="stat-value">{student.targetPoints}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Remaining Points</span>
          <span className="stat-value">{remaining}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending Approval</span>
          <span className="stat-value">{pendingCount}</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header-row">
          <h2>Progress Towards Target</h2>
          <span className="muted">{progressPct}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: progressPct + '%' }}
          />
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-header-row">
            <h2>Recent Activities</h2>
            <Link to="/activities" className="link-button">
              View all →
            </Link>
          </div>

          {recentActivities.length === 0 ? (
            <p className="muted">No activities added yet. Click "Add Activity" to get started.</p>
          ) : (
            <ul className="simple-list">
              {recentActivities.map((a) => (
                <li key={a.id}>
                  <div>
                    <strong>{a.title}</strong>
                    <div className="muted small">{a.date}</div>
                  </div>
                  <span className={'badge badge-' + a.status.toLowerCase()}>
                    {a.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2>Student Information</h2>
          <table className="info-table">
            <tbody>
              <tr>
                <td>UID</td>
                <td>{student.uid}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{student.name}</td>
              </tr>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
