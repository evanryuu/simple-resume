import { Outlet, useLocation, useNavigate } from 'react-router-dom'

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  console.log('current', location)

  return (
    <>
      <button type="button" onClick={() => navigate('/home')}>Go to Home</button>
      <button className="ml-4" type="button" onClick={() => navigate('/about')}>Go to About</button>
      <Outlet />
    </>
  )
}

export default Layout
