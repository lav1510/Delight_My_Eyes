import "../Styles/Navbar.css"

export default function Navbar() {
    return (
      <nav className="navigation">
        
        
        

        <div
          className="navigation-menu">
          <ul>
          
            <li>
              <a  id='logo' href="/">Home</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            
          </ul>
        </div>
      </nav>
    );
  }