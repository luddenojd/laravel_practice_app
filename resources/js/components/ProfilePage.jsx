import React from 'react'

const ProfilePage = ({ user }) => {
  return (
    <div>
      <h1>Profil</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  )
}

export default ProfilePage
