export default function Navbar () {
    return (
              
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-6">
          <div className="flex-1">
            <a
              className="btn btn-ghost text-xl text-primary"
              href="/"
              data-discover="true"
            >
              My Website
            </a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/" data-discover="true">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
    )
}