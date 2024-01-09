import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AppConfig } from '@/constants/appConfig'

import { HomePage } from './pages/Home/Loadable'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Helmet titleTemplate={AppConfig.title} defaultTitle={AppConfig.title}>
        <meta name="description" content={AppConfig.description} />
      </Helmet>

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
