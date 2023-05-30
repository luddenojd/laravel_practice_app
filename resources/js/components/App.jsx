import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home'
import Registration from './Registration'
import Menu from './Menu'
import Login from './Login'
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider
} from 'react-router-dom'

function Root() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      children: [
        { element: <Home />, path: '/' },
        { element: <Registration />, path: '/registrera' },
        { element: <Login />, path: '/loggain'}
      ],
      element: <Root />
    }
  ])

  return <RouterProvider router={router} />
}

export default App

if (document.getElementById('app')) {
  const Index = ReactDOM.createRoot(document.getElementById("app"));

  Index.render(
      <React.StrictMode>
          <App/>
      </React.StrictMode>
  )
}
