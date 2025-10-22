'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from './providers/ToastProvider'

interface LoginModalProps {
  onClose: () => void
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const router = useRouter()
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('Please fill in all fields', 'error')
      return
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('userID', data.user._id)
        showToast('Successfully logged in!', 'success')
        
        // Dispatch custom event to update other components
        window.dispatchEvent(new CustomEvent('userLogin'))
        
        onClose() // Close the modal
        window.location.reload();
      } else {
        showToast(data.message || 'Invalid credentials', 'error')
      }
    } catch (err) {
      showToast('Server error. Please try again later.', 'error')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="example@email.com"
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="••••••••"
            onKeyPress={handleKeyPress}
          />
        </div>

        <button className="btn-primary" onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default LoginModal
