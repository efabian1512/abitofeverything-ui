import './Layout.css'
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';


const Layout = () => {
    return <>
    <header className="sticky-top">
      <Navbar/>
    </header>
    <main className="flex-shrink-0 h-100">
      <div className="container pt-3 h-100">
         <Outlet/>
      </div>
    </main>
 </>
}

export default Layout;