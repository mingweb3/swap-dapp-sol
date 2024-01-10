import { Link } from 'react-router-dom'

export const ErrorPage: React.FC = () => {
  return (
    <div>
      <div>ErrorPage!!!</div>
      <Link to="/">Return to home</Link>
    </div>
  )
}
