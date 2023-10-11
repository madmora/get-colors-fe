import { css } from 'styled-components/macro'

import {
  compose,
  background,
  border,
  color,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
} from 'styled-system'
import customSystemProps from './custom'

export const styledSystemCompose = css`
  ${compose(
    background,
    border,
    color,
    flexbox,
    grid,
    layout,
    position,
    shadow,
    space,
    typography,
  )}
  ${customSystemProps};
`
