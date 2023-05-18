import React, { useState } from 'react'
import axios from 'axios'
import LandingPage from './LandingPage'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [landing, setLanding] = useState(false)

  const postLogin = async () => {
    if (email !== '' && password !== '') {
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

        setLanding(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="login-form">
      {landing ? (
        <LandingPage />
      ) : (
        <>
          <div>
            <p>Email:</p>
            <input onChange={(e) => setEmail(e.target.value)} className="email" type="text" />
          </div>
          <div>
            <p>Lösenord:</p>
            <input onChange={(e) => setPassword(e.target.value)} className="password" type="password" />
          </div>
          <button onClick={postLogin} className="login-button">
            <p>Logga in</p>
          </button>
          <button className="registration-button">
            <p className="registration-link">Inte medlem? Registrera ett konto här!</p>
          </button>
        </>
      )}
    </div>
  );
};

export default Login
