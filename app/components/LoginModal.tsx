'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginModalProps {
  onClose: () => void
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields')
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
        router.push('/annotate')
      } else {
        alert(data.message || 'Invalid credentials')
      }
    } catch (err) {
      alert('Server error. Please try again later.')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <button className="btn-primary" onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default LoginModal
