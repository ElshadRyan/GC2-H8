import { useNavigate } from "react-router"
import Categories from "../view/Categories"

export default function Navbar () {
  
  const navigate = useNavigate()
  function logout()
  {
    localStorage.clear()
    navigate('/login')
  }
  
  return (
              
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-6">
          {/* Left */}
          <div className="flex-1">
            <a href="/" className="btn btn-ghost text-xl text-primary">
              Home
            </a>
          </div>

          {/* Center */}
          <div className="flex-none hidden md:flex gap-2">
            <a href="/addProduct" className="btn btn-ghost">
              Add Product
            </a>

            <a href="/categories" className="btn btn-ghost">
              Categories
            </a>

            <a href="/addStaff" className="btn btn-ghost">
              Add Staff
            </a>
          </div>

          {/* Right */}
          <div className="flex-none">
            <button onClick={logout} className="btn btn-error btn-sm">
              Logout
            </button>
          </div>
        </div>
    )
}