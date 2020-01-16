/* eslint-disable no-undef, no-redeclare, no-underscore-dangle */

import _log from './app/log'
import _d, { Fragment as _Fragment } from './jsx-render'

declare global {
  const d: typeof _d
  const Fragment: typeof _Fragment
  const log: typeof _log

  const __DEV__: boolean
  const __TEST__: boolean
}
