import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getActivityById } from '../utils/activityStore.js'
import categories from '../data/categories.json'

export default function ActivityDetails() {
  const { id } = useParams()
  const { student } = useAuth()
  const [activity, setActivity] = useState(undefined)

  useEffect(() => {
    if (student) {
      setActivity(getActivityById(student.uid, id))
    }
  }, [student, id])

  if (activity === undefined) {
    return (
      <div className="page">
        <p className="muted">Loading...</p>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="page">
        <div className="card">
          <h2>Activity not found</h2>
          <p className="muted">This activity does not exist or does not belong to your account.</p>
          <Link to="/activities" className="btn btn-primary">
            Back to Activities
          </Link>
        </div>
      </div>
    )
  }

  const category = categories.find((c) => c.id === activity.category)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>{activity.title}</h1>
          <p className="muted">
            {category ? category.icon + ' ' + category.name : activity.category} • {activity.date}
          </p>
        </div>
        <span className={'badge badge-' + activity.status.toLowerCase()}>
          {activity.status}
        </span>
      </div>

      <div className="card">
        <h2>Description</h2>
        <p>{activity.description || 'No description provided.'}</p>
      </div>

      <div className="two-col">
        <div className="card">
          <h2>Points</h2>
          <table className="info-table">
            <tbody>
              <tr>
                <td>Points Claimed</td>
                <td>{activity.pointsClaimed}</td>
              </tr>
              <tr>
                <td>Points Approved</td>
                <td>{activity.pointsApproved}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{activity.status}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2>Activity Info</h2>
          <table className="info-table">
            <tbody>
              <tr>
                <td>Category</td>
                <td>{category ? category.name : activity.category}</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>{activity.date}</td>
              </tr>
              <tr>
                <td>Activity ID</td>
                <td>#{activity.id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Link to="/activities" className="link-button">
        ← Back to all activities
      </Link>
    </div>
  )
}
