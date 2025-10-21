'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../styles/modal.css'

interface RegisterModalProps {
  onClose: () => void
}

const RegisterModal = ({ onClose }: RegisterModalProps) => {
  const router = useRouter()
  const [closing, setClosing] = useState(false)

  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isFilipino, setIsFilipino] = useState(false)
  const [isFluent, setIsFluent] = useState(false)

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 250) // matches CSS fadeOut duration
  }

  const finishRegistration = async () => {
    if (
      fName &&
      lName &&
      age &&
      sex &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword &&
      isFilipino &&
      isFluent
    ) {
      try {
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_Name: fName,
            last_Name: lName,
            age,
            sex,
            email,
            password,
          }),
        })

        const data = await res.json()

        if (data.message === 'user with email already exists') {
          alert('User with this email already exists.')
        } else if (res.status === 201) {
          localStorage.setItem('userID', data.user._id)
          router.push('/annotate')
        } else {
          alert('Unexpected error occurred.')
        }
      } catch (error) {
        alert('Server error. Please try again later.')
      }
    } else {
      alert('Please fill up all fields correctly.')
    }
  }

  return (
    <div className={`modal-overlay ${closing ? 'closing' : ''}`}>
      <div className={`modal-content ${closing ? 'closing' : ''}`}>
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>
        <h2>Account Registration</h2>

        <div className="input-row">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              placeholder="First Name"
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Gender</label>
            <select value={sex} onChange={(e) => setSex(e.target.value)}>
              <option hidden>Gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
          </div>

          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={isFilipino}
              onChange={(e) => setIsFilipino(e.target.checked)}
            />{' '}
            Are you a Filipino citizen?
          </label>

          <label>
            <input
              type="checkbox"
              checked={isFluent}
              onChange={(e) => setIsFluent(e.target.checked)}
            />{' '}
            Can you read/speak both Filipino and English fluently?
          </label>
        </div>

        <button className="register-btn-primary" onClick={finishRegistration}>
          Register
        </button>
      </div>
    </div>
  )
}

export default RegisterModal
