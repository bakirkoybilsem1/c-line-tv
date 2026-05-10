import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import StudentUpload from './pages/StudentUpload'
import TeacherDashboard from './pages/TeacherDashboard'
import Dictionary from './pages/Dictionary'

function PrivateRoute({ children, role }) {
  const userRole = sessionStorage.getItem('role')
  if (userRole !== role) return <Navigate to="/login" />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/upload" element={
          <PrivateRoute role="student">
            <StudentUpload />
          </PrivateRoute>
        } />
        <Route path="/teacher" element={
          <PrivateRoute role="teacher">
            <TeacherDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
