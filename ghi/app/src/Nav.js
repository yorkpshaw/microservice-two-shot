import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Wardrobify</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="/shoes" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shoes</NavLink>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/shoes">View your shoes</NavLink></li>
                <li><NavLink className="dropdown-item" to="/shoes/new">Add a new shoe</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="/shoes" role="button" data-bs-toggle="dropdown" aria-expanded="false">Hats</NavLink>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/hats">View your hats</NavLink></li>
                <li><NavLink className="dropdown-item" to="/hats/new">Add a new hat</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
