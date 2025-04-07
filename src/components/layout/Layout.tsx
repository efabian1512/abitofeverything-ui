import './Layout.css'
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';


const Layout = () => {
    return <>
    <header>
      <Navbar/>
    </header>
    <main className="flex-shrink-0">
      <div className="container pt-3">
         <Outlet/>
      </div>
    </main>
 </>
}

export default Layout;