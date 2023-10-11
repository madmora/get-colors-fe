import { useCallback, useEffect, useRef } from 'react'
import { useLazyQuery } from '@apollo/client'

export const useLazyQueryPromise = (query: any, queryOptions = {}) => {
  const [execute, result] = useLazyQuery(query, queryOptions)

  const resolveRef: any = useRef()

  useEffect(() => {
    if (result.called && !result.loading && resolveRef.current) {
      resolveRef.current(result)
      resolveRef.current = undefined
    }
  }, [result])

  const queryLazily: any = useCallback(
    (options: any) => {
      execute({ ...options })
      return new Promise((resolve) => {
        resolveRef.current = resolve
      })
    },
    [execute],
  )

  return [queryLazily, result]
}
