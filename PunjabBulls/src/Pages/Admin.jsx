import { useNavigate } from 'react-router-dom'
import AdminDashboard from './Admin/AdminDashboard'

// No Layout wrapper — admin has its own sidebar
export default function Admin() {
  const navigate = useNavigate()

  // Redirect to login if no token
  if (!localStorage.getItem('admin_token')) {
    navigate('/admin/login')
    return null
  }

  return (
    <AdminDashboard
      onLogout={() => {
        localStorage.removeItem('admin_token')
        navigate('/')
      }}
      onViewPublicSite={() => navigate('/blog')}
    />
  )
}