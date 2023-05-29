import React, { useState } from 'react'

const Registration = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const createUser = () => {
    if (email !== '' && password !== '') {
      axios.post('http://localhost:8000/api/users', {
        name: name,
        email: email,
        password: password
      })
    }
  }

  return (
    <div className="registration-form">
      <div>
        <p>Namn:</p>
        <input onChange={(e) => setName(e.target.value)} className="name" type="text" />
      </div>
      <div>
        <p>Email:</p>
        <input onChange={(e) => setEmail(e.target.value)} className="email" type="text" />
      </div>
      <div>
        <p>Lösenord:</p>
        <input onChange={(e) => setPassword(e.target.value)} className="password" type="password" />
      </div>
        <button onClick={createUser} className="registration-create-button">
          <p>Skapa användare</p>
        </button>
    </div>
  );
};

export default Registration
