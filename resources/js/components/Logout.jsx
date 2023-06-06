import React from 'react';

const Logout = () => {

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')

      await axios.post('http://localhost:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      localStorage.removeItem('token')
      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button onClick={handleLogout} className="logout-button">
        <h1>Logga ut</h1>
      </button>
    </div>
  );
};

export default Logout;
