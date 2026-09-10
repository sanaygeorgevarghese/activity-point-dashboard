import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { getActivitiesForStudent } from '../utils/activityStore.js'
import categories from '../data/categories.json'

export default function Categories() {
  const { student } = useAuth()
  const [activities, setActivities] = useState([])

  useEffect(() => {
    if (student) {
      setActivities(getActivitiesForStudent(student.uid))
    }
  }, [student])

  function countForCategory(id) {
    return activities.filter((a) => a.category === id).length
  }

  function pointsForCategory(id) {
    return activities
      .filter((a) => a.category === id && a.status === 'Approved')
      .reduce((sum, a) => sum + Number(a.pointsApproved || 0), 0)
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Activity Categories</h1>
          <p className="muted">
            Approved categories under which you can claim activity points.
          </p>
        </div>
      </div>

      <div className="category-grid">
        {categories.map((c) => (
          <div className="card category-card" key={c.id}>
            <div className="category-icon">{c.icon}</div>
            <h3>{c.name}</h3>
            <p className="muted">{c.description}</p>
            <div className="category-stats">
              <span>{countForCategory(c.id)} activities</span>
              <span>{pointsForCategory(c.id)} pts earned</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
