import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import.meta.env.VITE_BACKEND_URL = 'http://localhost:5000/api'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
