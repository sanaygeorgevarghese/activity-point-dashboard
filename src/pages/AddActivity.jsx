import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { addActivityForStudent } from '../utils/activityStore.js'
import categories from '../data/categories.json'

const initialForm = {
  title: '',
  category: categories[0]?.id || '',
  date: '',
  description: '',
  pointsClaimed: '',
}

export default function AddActivity() {
  const { student } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function validate() {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Activity title is required.'
    if (!form.category) newErrors.category = 'Please select a category.'
    if (!form.date) newErrors.date = 'Please select a date.'
    if (!form.pointsClaimed || Number(form.pointsClaimed) <= 0) {
      newErrors.pointsClaimed = 'Enter a valid number of points.'
    }
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    addActivityForStudent(student.uid, {
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      description: form.description.trim(),
      pointsClaimed: Number(form.pointsClaimed),
    })

    setSuccess(true)
    setForm(initialForm)

    setTimeout(() => navigate('/activities'), 900)
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Add New Activity</h1>
          <p className="muted">
            Submit a new co-curricular or extra-curricular activity for approval.
          </p>
        </div>
      </div>

      <div className="card form-card">
        {success && (
          <div className="form-success">
            Activity submitted successfully! Redirecting to your activity list...
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="title">Activity Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Workshop on Machine Learning"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && <div className="form-error">{errors.title}</div>}

          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.name}
              </option>
            ))}
          </select>
          {errors.category && <div className="form-error">{errors.category}</div>}

          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && <div className="form-error">{errors.date}</div>}

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Briefly describe your role and the activity..."
            value={form.description}
            onChange={handleChange}
          />

          <label htmlFor="pointsClaimed">Points Claimed</label>
          <input
            id="pointsClaimed"
            name="pointsClaimed"
            type="number"
            min="1"
            placeholder="e.g. 10"
            value={form.pointsClaimed}
            onChange={handleChange}
          />
          {errors.pointsClaimed && (
            <div className="form-error">{errors.pointsClaimed}</div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Submit Activity
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setForm(initialForm)}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
