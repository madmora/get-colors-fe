import { system } from 'styled-system'
import { heightTransformer, transitionTransformer } from './transformers'

export const customProps: any = {
  backfaceVisibility: true,
  borderCollapse: true,
  boxSizing: true,
  css: true,
  cursor: true,
  direction: true,
  fill: {
    property: 'fill',
    scale: 'colors',
  },
  filter: true,
  float: true,
  height: {
    property: 'height',
    transform: heightTransformer,
  },
  listStyle: true,
  objectFit: true,
  objectPosition: true,
  pointerEvents: true,
  style: true,
  textDecoration: true,
  textOverflow: true,
  textTransform: true,
  transform: true,
  transformOrigin: true,
  transition: {
    property: 'transition',
    transform: transitionTransformer,
  },
  userSelect: true,
  whiteSpace: true,
  willChange: true,
  wordBreak: true,
  zoom: true,
}

const customSystemProps = system(customProps)

export default customSystemProps
