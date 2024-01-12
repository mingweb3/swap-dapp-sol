import * as React from 'react'
import { lazyLoad } from '@/utils/loadable'

export const AirdropPage: React.FC = lazyLoad(
  () => import('./index'),
  module => module.AirdropPage
)
