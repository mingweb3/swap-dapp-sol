import * as React from 'react'
import { lazyLoad } from '@/utils/loadable'

export const HomePage: React.FC = lazyLoad(
  () => import('./index'),
  module => module.HomePage
)
