import { NavLink } from 'react-router-dom'
import Seo from '../components/Seo'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you are looking for does not exist."
      />
      <div className="container">
        <div className="not-found" role="alert">
          <AlertTriangle size={48} className="not-found-icon" />
          <h1>Page not found</h1>
          <p>The page you’re looking for doesn’t exist or has been moved.</p>
          <NavLink to="/" className="button button-large">
            Go back home
          </NavLink>
        </div>
      </div>
    </>
  )
}
