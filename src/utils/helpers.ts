import {
  addIndex,
  complement,
  either,
  isEmpty,
  isNil,
  map,
  pathOr,
  propOr,
} from 'ramda'
import { Order } from 'types'
import { AppConstants } from './constants'

export const isEmptyOrUndefined = either(isNil, isEmpty)

export const hasData = complement(isEmptyOrUndefined)

export const pathOrNull = pathOr(null)

export const propOrNull = propOr(null)

export const mapIndexed = addIndex(map)

export const isArray = (ele: any): boolean => Array.isArray(ele)

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export const includeString = (text: string, fragment: string): boolean =>
  text.toLowerCase().indexOf(fragment.toLowerCase()) > -1

/**
 * Convert seconds to HH:MM:SS
 * @param timeSeconds {number}
 * @returns {string}
 */
export const secondsToTimeFormat = (timeSeconds: number) => {
  const hours = Math.floor(timeSeconds / 3600)
  const minutes = Math.floor((timeSeconds - hours * 3600) / 60)
  const seconds = timeSeconds - hours * 3600 - minutes * 60

  const hoursString = hours < 10 ? `0${hours}` : hours.toString()
  const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString()
  const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString()

  return `${hoursString}:${minutesString}:${secondsString}`
}

export const getUnixEpochTime = (): number => (new Date().getTime() / 1000) | 0

export const getTime = (unixEpochTime: number) => {
  const date = new Date(unixEpochTime)

  let hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const ampm = hours >= 12 ? 'pm' : 'am'

  hours %= 12
  hours = hours || 12
  const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString()
  const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString()

  return `${hours}:${minutesString}:${secondsString} ${ampm}`
}

/**
 * Returns true if the given string is a valid main category type
 * (iniciar, finalizar, or reabrir), false otherwise.
 * @param {string} category - The string to check
 * @returns {boolean} Whether the string is a valid main category type
 */
export const isMainCategoryType = (category: string): boolean => {
  const baseCategoryType = AppConstants.CATEGORY_TYPES
  return baseCategoryType.includes(category)
}

/**
 * Format a Unix timestamp into a string based on the given format string.
 * @param {number} timestamp - Unix timestamp in seconds.
 * @param {string} format - Format string for the date. Can include: YYYY, MM, DD, hh, mm, ss, tt.
 * @returns {string} - Formatted date string.
 */
export const formatDate = (timestamp: number, format: string): string => {
  const date = new Date(timestamp)
  const hours = date.getHours() % 12 || 12 // convert to 12-hour format
  const amOrPm = date.getHours() < 12 ? 'AM' : 'PM'
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const minute = date.getUTCMinutes()
  const second = date.getUTCSeconds()

  format = format.replace('YYYY', year.toString())
  format = format.replace('MM', month.toString().padStart(2, '0'))
  format = format.replace('DD', day.toString().padStart(2, '0'))
  format = format.replace('hh', hours.toString().padStart(2, '0'))
  format = format.replace('mm', minute.toString().padStart(2, '0'))
  format = format.replace('ss', second.toString().padStart(2, '0'))
  format = format.replace('tt', amOrPm)

  return format
}
