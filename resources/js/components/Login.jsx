import React, { useState } from 'react'
import Button from '@mui/material/Button'

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: ''
  })
  return (
    <div className="login-form">
      <label for="email">Email</label>
      <input name="email" type="text" />
      <label for="password">Lösenord</label>
      <input name="password" type="text" />
      <Button variant="contained">Logga in</Button>
    </div>
  );
};

export default Login
