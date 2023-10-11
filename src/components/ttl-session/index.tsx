import SessionWarningModal from 'components/session-warning-modal'
import { UseAuth } from 'hooks'
import { isNil } from 'ramda'
import { useCallback, useEffect, useState } from 'react'
import { getSessionExpiresTime } from 'utils'

interface TtlSessionProps {
  children: React.ReactNode
}

const TtlSession = ({ children }: TtlSessionProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [wasModalClosed, setWasModalClosed] = useState<boolean>(false)
  const { auth, logout } = UseAuth()

  useEffect(() => {
    setWasModalClosed(false)
    let expiresTime = getSessionExpiresTime()
    if (!isNil(expiresTime) && expiresTime <= 0) {
      logout()
    }

    const interval = setInterval(() => {
      expiresTime = getSessionExpiresTime()

      if (isNil(expiresTime)) {
        clearInterval(interval)
      } else if (expiresTime && expiresTime > 0 && expiresTime < 60) {
        setOpenModal(true)
      } else if (expiresTime <= 0) {
        setOpenModal(false)
        logout()
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [logout, auth])

  const onClose = useCallback(() => {
    setOpenModal(false)
    setWasModalClosed(true)
  }, [])

  const closeSession = useCallback(() => {
    setOpenModal(false)
    logout()
  }, [logout])

  return (
    <>
      {children}
      <SessionWarningModal
        open={openModal && !wasModalClosed}
        onClose={onClose}
        closeSession={closeSession}
      />
    </>
  )
}

export default TtlSession
