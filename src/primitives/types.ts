import {
  BackgroundProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TypographyProps,
} from 'styled-system'

export type StyledSystemProps = BackgroundProps &
  BorderProps &
  ColorProps &
  FlexboxProps &
  GridProps &
  LayoutProps &
  PositionProps &
  ShadowProps &
  SpaceProps &
  TypographyProps

export type HtmlProps = StyledSystemProps & {
  as?: any
  backfaceVisibility?: string | string[]
  borderCollapse?: string | string[]
  boxSizing?: string | string[]
  children?: React.ReactNode
  css?: any
  cursor?: string
  direction?: string | string[]
  fill?: string | string[]
  filter?: string | string[]
  float?: string | string[]
  listStyle?: string | string[]
  objectFit?: string | string[]
  objectPosition?: string | string[]
  pointerEvents?: string
  ref?: any
  style?: object
  textDecoration?: string | string[]
  textOverflow?: string | string[]
  textTransform?: string | string[]
  transform?: string | string[]
  transformOrigin?: string | string[]
  transition?: string
  userSelect?: string | string[]
  whiteSpace?: string | string[]
  willChange?: string | string[]
  wordBreak?: string | string[]
  zoom?: string | string[]
}
