import { curry, head, is, join, map, pipe, split, tail, trim } from 'ramda'

const defaultEase = 'cubic-bezier(0.230, 1.000, 0.320, 1.000)'

const transitionMapper = (ease, duration, properties) =>
  map((property) => `${property} ${duration} ${ease}`, properties)

const transitionProperties = curry((ease, duration, properties) =>
  transitionMapper(ease, duration, properties),
)

const transitionEaseInline = pipe(transitionProperties(defaultEase), join(', '))

export const heightTransformer = (value) => {
  if (value > 0 && value <= 1) {
    return `${(value * 100).toFixed(1)}%`
  }

  if ((is(Number, value) && value > 1) || value === 0) {
    return `${value}px`
  }

  return value
}

/**
 * @example <Primitives.Box transition="0.3s css-property-1 css-property-2" />
 * Applies the same transition css as the transitionEase helper function.
 * @param value {string}
 */
export const transitionTransformer = (value) => {
  const transitionList = split(',', value)
  return pipe(
    map((val) => {
      const transitionArr = split(' ', trim(val))
      return transitionEaseInline(head(transitionArr), tail(transitionArr))
    }),
    join(', '),
  )(transitionList)
}
