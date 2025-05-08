import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import {useRef, useState }from 'react';
import { useEffect } from 'react';
import { userLogout} from '../../services/UserService';
import RoleTypes from '../register/roles-enum';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { getActualCart } from '../../services/ShoppingCartService';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../state/user/userSlice';
import ProductFilter from '../products/products-filter/ProductsFilter';
import PriceFilter from '../price-filter/PriceFilter';
import useOnClickOutside from '../../CustomHooks/useOnClickOutside';

const Navbar = () => {
  const [isUserDropdownExpanded, setIsUserDropdownExpanded] = useState<boolean>(false);
  const [isCategoryDropdownExpanded, setIsCategoryDropdownExpanded] = useState<boolean>(false);
  const [isPriceDropdownExpanded, setIsPriceDropdownExpanded] = useState<boolean>(false);
  const [isAUserRouteActive, setIsAUserRouteActive,] = useState<boolean>(false);
  const [isACategoryFilterActive, setIsCategoryFilterActive] = useState<boolean>(false);
  const [isAPriceFilterActive, setIsAPriceFilterActive] = useState<boolean>(false);
  const priceFilterSectionRef = useRef(null);
 
  const [userInfo, setUserInfo] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cartInfo.cart);
 
 const actualCart = getActualCart(cart);

  useEffect(() => {
    setIsUserDropdownExpanded(false);
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')!));
  }, []);

  useEffect(()=> {
    const userRoutes = ["/my/orders", "/admin/orders", "/admin/products"];
    setIsCategoryFilterActive(location?.search?.includes('category'));
    setIsPriceDropdownExpanded(false);
    setIsAPriceFilterActive(location.search.includes('desde') || location.search.includes('hasta'));
    setIsAUserRouteActive(userRoutes.includes(location.pathname));
    setIsUserDropdownExpanded(false);
  }, [location]);

  const logout = () => {
    userLogout(userInfo?.accessToken).then(resp => {
      if(resp.data.success) {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        dispatch(removeUser());
        navigate("/login")
      }
    }).catch((error) => error);
  }

  const hideDropdowns = () => {
    setIsUserDropdownExpanded(false);
    setIsCategoryDropdownExpanded(false);
    setIsPriceDropdownExpanded(false);
  }

  useOnClickOutside(priceFilterSectionRef, () => setIsPriceDropdownExpanded(false));

    return  <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
             { location.pathname === '/' ? <i className="bi bi-house-fill"></i> : <i className="bi bi-house"></i>}
              </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
              <NavLink onClick={() =>  hideDropdowns} className="nav-link"  to="/shopping-cart">
                {location.pathname === '/shopping-cart' ? <i title={'Carrito'} className="bi bi-cart-fill"></i> : <i className="bi bi-cart"></i>}
                <span className="badge rounded-pill bg-warning text-dark ms-1">{actualCart?.totalItemsCount}</span>
                </NavLink>
          </li>
         { location.pathname === '/' && <>
           <li style={{zIndex: 111111}} className={`nav-item dropdown ${isCategoryDropdownExpanded ? ' show' :''}`}>
              <a onClick={() => {
                setIsCategoryDropdownExpanded(!isCategoryDropdownExpanded);
                setIsUserDropdownExpanded(false);
                setIsPriceDropdownExpanded(false);
                }} className={`nav-link dropdown-toggle ${isACategoryFilterActive ? ' active' : ''}`}>Filtar por categoria</a>
              <div onMouseLeave={() => setIsCategoryDropdownExpanded(false)} className={`dropdown-menu ${isCategoryDropdownExpanded ? ' show not-hover' :''}`}>
                <ProductFilter/>
              </div>
          </li>

           <li style={{zIndex: 111111}} className={`nav-item dropdown ${isPriceDropdownExpanded ? ' show' :''}`}>
              <a onClick={() => {
                setIsPriceDropdownExpanded(!isPriceDropdownExpanded);
                setIsCategoryDropdownExpanded(false);
                setIsUserDropdownExpanded(false);
                }} className={`nav-link dropdown-toggle ${isAPriceFilterActive ? ' active' : ''}`}>Filtar por rango de precio</a>
              <div ref={priceFilterSectionRef} style={{width: '400px'}} className={`dropdown-menu p-2 ${isPriceDropdownExpanded ? ' show not-hover' :''}`}>
                <PriceFilter />
                {/* <Link className="dropdown-item clickable" to="/my/orders">Mis Ordenes</Link>
                { userInfo?.user?.roles?.includes(RoleTypes.ROLE_ADMIN) && <>
                  {<Link className="dropdown-item clickable" to="/admin/orders">Administrar Ordenes</Link>}
                  <Link className="dropdown-item clickable" to="/admin/products">Administrar Productos</Link></>}
                  <a onClick={logout} className="dropdown-item clickable">Cerrar sesión</a> */}
              </div>
          </li>
          </>}
        </ul>
        <ul className="d-flex align-items-center navbar-nav mb-2 mb-md-0">
          { userInfo && <li style={{zIndex: 111111}} className={`nav-item dropdown ${isUserDropdownExpanded ? ' show' :''}`}>
              <a onClick={() => {
                setIsUserDropdownExpanded(!isUserDropdownExpanded);
                setIsPriceDropdownExpanded(false);
                setIsCategoryDropdownExpanded(false);
                }} className={`nav-link dropdown-toggle ${isAUserRouteActive ? ' active' : ''}`}>{userInfo?.user?.email}</a>
              <div onMouseLeave={() => setIsUserDropdownExpanded(false)} className={`dropdown-menu ${isUserDropdownExpanded ? ' show not-hover' :''}`}>
                <Link className="dropdown-item clickable" to="/my/orders">Mis Ordenes</Link>
                { userInfo?.user?.roles?.includes(RoleTypes.ROLE_ADMIN) && <>
                  {<Link className="dropdown-item clickable" to="/admin/orders">Administrar Ordenes</Link>}
                  <Link className="dropdown-item clickable" to="/admin/products">Administrar Productos</Link></>}
                  <a onClick={logout} className="dropdown-item clickable">Cerrar sesión</a>
              </div>
          </li> }
           {!userInfo && <li className="nav-item">
            <Link className="nav-link clickable" to="/login">Ingresar</Link>
            </li>}

             {!userInfo && <li className="nav-item">
            <Link className="nav-link clickable" to="/register">Registrarse</Link>
            </li>}
        </ul>
      </div>
    </div>
  </nav>

}

export default Navbar;
