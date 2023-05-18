import React, { useEffect } from 'react'
import axios from 'axios'

const LandingPage = () => {
  const testAuth = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/movies', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  const getToken = () => {
    return localStorage.getItem('token')
  };

  useEffect(() => {
    testAuth()
  }, [])

  return (
    <div>
      <p>Landing</p>
      <button onClick={testAuth}>Click here</button>
    </div>
  );
};

export default LandingPage
