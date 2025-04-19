import './Layout.css'
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getShoppingCartThunk } from '../../state/shopping-cart/shoppingCartSlice';
import { AppDispatch } from '../../state/store';
import { ScrollRestoration } from 'react-router-dom';


const Layout = () => {

    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
      dispatch(getShoppingCartThunk());
    }, []);

    return <>
  
    <header className="fixed-top">
      <Navbar/>
    </header>
    <main style={{marginTop: '5rem'}} className="h-100">
      <div className="container ps-0 pt-3 h-100">
          <ScrollRestoration/>
         <Outlet/>
      </div>
    </main>
 </>
}

export default Layout;