import * as React from 'react'
import { lazyLoad } from '@/utils/loadable'

export const SwapPage: React.FC = lazyLoad(
  () => import('./index'),
  module => module.SwapPage
)
