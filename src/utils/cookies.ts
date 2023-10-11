export const getCookie = (name: string): string | undefined => {
  if (typeof document !== 'undefined') {
    const matches = document.cookie.match(
      new RegExp(
        `(?:^|; )${name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`,
      ),
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  return undefined
}

export interface CookieOptions {
  expires?: Date | string
  path?: string
  'max-age'?: number
}

export const setCookie = (name: string, value: string, opt: CookieOptions) => {
  if (typeof document !== 'undefined') {
    const options: CookieOptions = {
      path: '/',
      // add other defaults here if necessary
      ...opt,
    }

    if (options?.expires instanceof Date) {
      options.expires = options.expires.toUTCString()
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
      value,
    )}`

    Object.keys(options).forEach((optionKey) => {
      updatedCookie += `; ${optionKey}`
      const optionValue = options[optionKey as keyof CookieOptions]
      if (optionValue) {
        updatedCookie += `=${optionValue}`
      }
    })

    document.cookie = updatedCookie
  }
}

export const deleteCookie = (name: string) => {
  setCookie(name, '', {
    'max-age': -1,
  })
}

/**
 * Return a Date adding time in hours according the timeToExpire parameter.
 * Eg. timeToExpire = 4 the time will be set 4 hours after the current time,
 * if timeToExpire = 24 mean one day and so on
 * @param timeToExpire time in hours
 * @returns {Date}
 */
export const getExpireTime = (timeToExpire: number) => {
  const now = new Date()
  const time = now.getTime()
  const expireTime = time + timeToExpire * 3600 * 1000
  now.setTime(expireTime)
  return now
}
