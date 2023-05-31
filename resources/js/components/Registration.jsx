import React, { useState, useEffect } from 'react'

const Registration = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorName, setErrorName] = useState(false)
  const [userExists, setUserExists] = useState(false)
  const [userCreated, setUserCreated] = useState(false)

  const alfaKrull = '@'

  const createUser = async () => {

    if (email === '' || email.length < 6 || !email.includes(alfaKrull)) {
      setErrorEmail(true)
    } else if (password === '' || password.length < 6) {
      setErrorPassword(true)
    } else if (name === '') {
      setErrorName(true)
    }

      try {
        const response = await axios.post('http://localhost:8000/api/users', {
          name: name,
          email: email,
          password: password
        });
        setUserCreated(true)
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)

      } catch (error) {
        if(error.response.data.message === 'The email has already been taken.') {
          setUserExists(true)
        }
      }
  }

  const handleKey = (e) => {
    if(e.key === "Enter") {
      createUser()
    }
  }

  useEffect(() => {
    if(email.length !== "" && email.length > 6) {
      setErrorEmail(false)
    }
    if(password.length !== "" && password.length > 6) {
      setErrorPassword(false)
    }
    if(name.length !== "") {
      setErrorName(false)
    }
  }, [email, password, name])

  return (
    <div className="registration-form">
      {userCreated
      ?
      <p>Användare skapad!</p>
      :
      <>
              <div>
        <p>Namn:</p>
        <input
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => handleKey(e)}
          className="name"
          type="text"
        />
        {errorName && <p className="error-message">Ange ditt namn</p>}
      </div>
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
      {userExists && <p>Användare med denna mailadressen är redan registrerad</p> }
        <button onClick={createUser} className="registration-create-button">
          <p>Skapa användare</p>
        </button>
      </>
      }

    </div>
  );
};

export default Registration
