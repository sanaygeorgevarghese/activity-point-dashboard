// Simple localStorage-backed data layer.
// Since this is a front-end-only assignment (no backend/database),
// activities added by the student at runtime are merged with the
// base JSON data and persisted in the browser's localStorage so
// they survive page refreshes.

import baseActivities from '../data/activities.json'

const STORAGE_KEY_PREFIX = 'apms_added_activities_'

function getAddedActivities(uid) {
  const raw = localStorage.getItem(STORAGE_KEY_PREFIX + uid)
  return raw ? JSON.parse(raw) : []
}

function saveAddedActivities(uid, activities) {
  localStorage.setItem(STORAGE_KEY_PREFIX + uid, JSON.stringify(activities))
}

export function getActivitiesForStudent(uid) {
  const fromJson = baseActivities.filter((a) => a.uid === uid)
  const added = getAddedActivities(uid)
  return [...fromJson, ...added].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
}

export function addActivityForStudent(uid, activity) {
  const added = getAddedActivities(uid)
  const allExisting = [...baseActivities, ...added]
  const nextId =
    allExisting.length > 0
      ? Math.max(...allExisting.map((a) => a.id)) + 1
      : 1

  const newActivity = {
    id: nextId,
    uid,
    status: 'Pending',
    pointsApproved: 0,
    ...activity,
  }

  const updated = [...added, newActivity]
  saveAddedActivities(uid, updated)
  return newActivity
}

export function getActivityById(uid, id) {
  const all = getActivitiesForStudent(uid)
  return all.find((a) => String(a.id) === String(id))
}
