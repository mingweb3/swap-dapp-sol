import * as React from 'react'
import { Helmet } from 'react-helmet-async'

export const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="This is homepage" />
      </Helmet>
      <div>
        <h1>Home Page</h1>
      </div>
    </>
  )
}
