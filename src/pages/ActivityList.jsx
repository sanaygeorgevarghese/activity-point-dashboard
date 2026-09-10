import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getActivitiesForStudent } from '../utils/activityStore.js'
import categories from '../data/categories.json'

export default function ActivityList() {
  const { student } = useAuth()
  const [activities, setActivities] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (student) {
      setActivities(getActivitiesForStudent(student.uid))
    }
  }, [student])

  const categoryName = (id) =>
    categories.find((c) => c.id === id)?.name || id

  const filtered = useMemo(() => {
    return activities.filter((a) => {
      const categoryOk = categoryFilter === 'all' || a.category === categoryFilter
      const statusOk = statusFilter === 'all' || a.status === statusFilter
      return categoryOk && statusOk
    })
  }, [activities, categoryFilter, statusFilter])

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>My Activities</h1>
          <p className="muted">All co-curricular and extra-curricular activities you've submitted.</p>
        </div>
        <Link to="/add-activity" className="btn btn-primary">
          + Add Activity
        </Link>
      </div>

      <div className="filters-row">
        <div>
          <label>Category</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <p className="muted">No activities match the selected filters.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Claimed</th>
                  <th>Approved</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{categoryName(a.category)}</td>
                    <td>{a.date}</td>
                    <td>{a.pointsClaimed}</td>
                    <td>{a.pointsApproved}</td>
                    <td>
                      <span className={'badge badge-' + a.status.toLowerCase()}>
                        {a.status}
                      </span>
                    </td>
                    <td>
                      <Link to={'/activities/' + a.id} className="link-button">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
