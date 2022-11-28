import "../Styles/Navbar.css"

export default function Navbar() {
    return (
      <nav className="navigation">
        
        
        

        <div
          className="navigation-menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/Login">Login</a>
            </li>
            <li>
              <a href="/Register">Register</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }