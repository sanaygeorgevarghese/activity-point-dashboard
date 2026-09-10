# Activity Points Management System

A React.js front-end application that helps students view and manage activity
points earned through co-curricular, extra-curricular, technical,
professional, social, and other approved activities.

Built for the Web Programming assignment. No backend/database is used — all
data is sourced from JSON files, with newly added activities persisted in the
browser's `localStorage` so they survive page refreshes.

## Features

- **Login Page** – Student login using UID and password, validated against
  `src/data/students.json`.
- **Dashboard** – Student name, UID, department, semester, total points
  earned, target points, remaining points, and a progress bar.
- **Activity List** – Table of activities with name, category, date, points
  claimed, points approved, and status, with category/status filters.
- **Add Activity** – Form to submit a new activity (title, category, date,
  description, points claimed) with validation.
- **Activity Details** – Full details view for a single activity.
- **Activity Categories** – Technical/Professional, Sports, Cultural, Social
  Service, Entrepreneurship, and Leadership, each with activity/point counts.
- **Student Profile** – Basic info plus a summary of points by category.

## Tech Stack

- React 18 + Vite
- React Router (`HashRouter`, for GitHub Pages compatibility)
- Plain CSS (no UI framework)
- JSON files as the data source

## Project Structure

```
activity-points-app/
├── src/
│   ├── components/       # Navbar, ProtectedRoute
│   ├── context/           # AuthContext (login/session state)
│   ├── data/               # students.json, categories.json, activities.json
│   ├── pages/              # Login, Dashboard, ActivityList, ActivityDetails,
│   │                        # AddActivity, Categories, Profile
│   ├── utils/               # activityStore.js (localStorage data layer)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Sample Login Credentials

| UID       | Password   | Name         |
|-----------|------------|--------------|
| 21CS101   | pass123    | Aditi Sharma |
| 21EC045   | welcome1   | Rohan Menon  |
| 22ME019   | student99  | Kavya Nair   |

(The login page also has clickable buttons to auto-fill these for you.)

## Running Locally

1. Install [Node.js](https://nodejs.org/) (v18 or later recommended).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the URL shown in the terminal (usually `http://localhost:5173`).

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `activity-points-management-system`)
   and push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Activity Points Management System"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. Open `vite.config.js` and set `base` to match your repository name:
   ```js
   base: '/<your-repo>/',
   ```
3. Install the deployment helper (already listed in `devDependencies`, so a
   plain `npm install` covers it) and deploy:
   ```bash
   npm run deploy
   ```
   This runs `vite build` and pushes the `dist/` folder to a `gh-pages`
   branch using the `gh-pages` package.
4. In your GitHub repository, go to **Settings → Pages**, and set the source
   branch to `gh-pages` (root). Your site will then be live at:
   ```
   https://<your-username>.github.io/<your-repo>/
   ```

> The app uses `HashRouter`, so routes look like `.../#/dashboard`. This
> avoids the 404 issues that plain `BrowserRouter` runs into on GitHub Pages
> static hosting.

## Notes on Data Persistence

Since this is a front-end-only application with no backend/database:

- `students.json`, `categories.json`, and `activities.json` hold the base
  sample data shipped with the app.
- When a student adds a new activity through the **Add Activity** form, it is
  saved to the browser's `localStorage` (per student UID) and merged with the
  base JSON data whenever activities are displayed. This means added
  activities persist across page refreshes on the same browser, without
  needing a server.
- New activities are added with `status: "Pending"` and `pointsApproved: 0`,
  simulating a real approval workflow (approval itself would be handled by
  staff/admin in a full system, which is outside the scope of this
  front-end-only assignment).

## React Concepts Used

- Functional components with JSX
- `useState`, `useEffect`
- Props and component composition
- React Router (`HashRouter`, `Routes`, `Route`, `NavLink`, `useNavigate`,
  `useParams`, `Navigate`)
- Context API (`AuthContext`) for global login/session state
- Conditional rendering (login redirects, empty states, filtered lists)
- Controlled form handling with client-side validation
