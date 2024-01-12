import { Link } from 'react-router-dom'
import './styles.scss'

export const ErrorPage: React.FC = () => {
  return (
    <div className="page-not-found flex">
      <div className="wpr">
        <div className="ttl">Page Not Found!</div>
        <Link to="/">Return to home</Link>
      </div>
    </div>
  )
}
