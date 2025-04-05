
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import {useState }from 'react';
import { useEffect } from 'react';

const Navbar = () => {
  const [isDropdownExpanded, setIsDropdownExpanded] = useState<boolean>(false);
  const [isAUserRouteActive, setIsAUserRouteActive,] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setIsDropdownExpanded(false);
  }, []);

  useEffect(()=> {
    const userRoutes = ["/my/orders", "/admin/orders", "/admin/products"];
    console.log(location.pathname);
    setIsAUserRouteActive(userRoutes.includes(location.pathname));
  }, [location]);


    return  <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Home</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
              <NavLink onClick={() => setIsDropdownExpanded(false)} className="nav-link"  to="/shopping-cart">Shopping Cart</NavLink>
          </li>
          <li className={`nav-item dropdown ${isDropdownExpanded ? ' show' :''}`}>
            
              <a onClick={() => setIsDropdownExpanded(!isDropdownExpanded)} className={`nav-link dropdown-toggle ${isAUserRouteActive ? ' active' : ''}`}>Username</a>
              <div className={`dropdown-menu ${isDropdownExpanded ? ' show' :''}`}>
                  <Link className="dropdown-item clickable" to="/my/orders">My Orders</Link>
                  <Link className="dropdown-item clickable" to="/admin/orders">Manage Orders</Link>
                  <Link className="dropdown-item clickable" to="/admin/products">Manage Products</Link>
                  <a className="dropdown-item clickable">Log Out</a>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

}

export default Navbar;