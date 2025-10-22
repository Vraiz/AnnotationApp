'use client'
import { usePathname } from 'next/navigation'
import LoginModal from '../LoginModal'
import { useLoginModal } from '../../hooks/useLoginModal'

const ModalProvider = () => {
  const pathname = usePathname()
  const loginModal = useLoginModal()

  // Show modal if either pathname is /login OR Zustand store says it's open
  const shouldShowModal = pathname === '/login' || loginModal.isOpen

  return (
    <>
      {shouldShowModal && <LoginModal onClose={loginModal.close} />}
    </>
  )
}

export default ModalProvider
