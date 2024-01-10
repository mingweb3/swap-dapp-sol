import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

import { PATHS } from '@/constants/paths'
import { Button } from '@/components/UI/Button'

import './styles.scss'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()

  const onLaunchApp = React.useCallback(() => {
    navigate(PATHS.SWAP)
  }, [navigate])

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="This is homepage" />
      </Helmet>
      <div className="home-page__container">
        <div className="home-page__inner">
          <div className="home-page__logo-wrapper">
            <img src="/images/logo/logo.png" alt="logo.png" />
          </div>
          <div>
            <Button title="Launch App" onClick={onLaunchApp} />
          </div>
        </div>
      </div>
    </>
  )
}
