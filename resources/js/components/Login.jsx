import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [wrongPasswordOrEmail, setWrongPasswordOrEmail] = useState(false)

  const alfaKrull = '@'

  const postLogin = async () => {
    if (email === '' || email.length < 6 || !email.includes(alfaKrull)) {
      setErrorEmail(true)
    } else if (password === '' || password.length < 6) {
        setErrorPassword(true)
      } else {
        try {
          await axios.get('http://localhost:8000/sanctum/csrf-cookie')

          const response = await axios.post(
            'http://localhost:8000/api/login',
            {
              email: email,
              password: password,
            },
            {
              withCredentials: true,
            }
          )
          localStorage.setItem('token', response.data.token)
          window.location.href = '/';
        } catch (error) {
          console.log(error)
          setWrongPasswordOrEmail(true)
        }
      }
  }

  const handleKey = (e) => {
    if(e.key === "Enter") {
      postLogin()
    }
  }

  useEffect(() => {
    if(email.length !== "" && email.length > 6) {
      setErrorEmail(false)
    }
    if(password.length !== "" && password.length > 6) {
      setErrorPassword(false)
    }
  }, [email, password])

  return (
    <div className="login-form">
          <div>
            <p>Email:</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => handleKey(e)}
              className="email"
              type="text"
            />
            {errorEmail && <p className="error-message">Ange en giltig mailadress</p>}
          </div>
          <div>
            <p>Lösenord:</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKey(e)}
              className="password"
              type="password"
            />
            {errorPassword && <p className="error-message">Ange ett giltigt lösenord</p>}
          </div>
          {wrongPasswordOrEmail && <p className="error-message">Fel mailadress eller lösenord, var vänlig kontrollera och försök igen</p>}
          <button onClick={postLogin} className="login-button">
            <p>Logga in</p>
          </button>
          <Link to='/registrera' className="registration-button">
            <p className="registration-link">Inte medlem? Registrera ett konto här!</p>
          </Link>
    </div>
  )
}

export default Login
