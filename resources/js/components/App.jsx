import Example from './Example'
import Registration from './Registration'
import Menu from './Menu'

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
        { element: <Example />, path: '/' },
        { element: <Registration />, path: '/registration' },
      ],
      element: <Root />
    }
  ])

  return <RouterProvider router={router} />
}

export default App
