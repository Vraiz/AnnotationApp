'use client'
import { usePathname } from 'next/navigation'
import LoginModal from '../LoginModal'
import { useState, useEffect } from 'react'

const ModalProvider = () => {
  const pathname = usePathname()
  const [showModal, setShowModal] = useState(false)

  // Open login modal only when visiting /login
  useEffect(() => {
    if (pathname === '/login') {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }, [pathname])

  const handleClose = () => setShowModal(false)

  return (
    <>
      {showModal && <LoginModal onClose={handleClose} />}
    </>
  )
}

export default ModalProvider
