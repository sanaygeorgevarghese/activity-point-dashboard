import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Change "activity-points-management-system" below to the exact
// name of your GitHub repository before deploying to GitHub Pages.
// Example: if your repo URL is https://github.com/yourname/apms
// then base should be '/apms/'
export default defineConfig({
  plugins: [react()],
  base: '/activity-points-management-system/',
})
