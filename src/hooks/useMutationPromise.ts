import { useCallback, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/client'

export const useMutationPromise = (mutation: any, mutationOptions = {}) => {
  const [execute, result] = useMutation(mutation, mutationOptions)

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
