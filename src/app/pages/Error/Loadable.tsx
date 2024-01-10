import * as React from 'react'
import { lazyLoad } from '@/utils/loadable'

export const ErrorPage: React.FC = lazyLoad(
  () => import('./index'),
  module => module.ErrorPage
)
