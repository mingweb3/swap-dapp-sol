import { AppConfig } from '@/constants/appConfig'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header'

import './styles.scss'
import { Footer } from '../Footer'

export const RootLayout: React.FC = () => {
  return (
    <>
      <Helmet titleTemplate={AppConfig.title} defaultTitle={AppConfig.title}>
        <meta name="description" content={AppConfig.description} />
      </Helmet>
      <div className="root-layout__container">
        <div className="root-layout__wrapper">
          <Header />
          <div className="root-layout__main">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}
