import { createBrowserRouter } from "react-router-dom";
import AdminProducts from "../components/admin/admin-products/AdminProducts";
import AdminOrders from "../components/admin/admin-orders/AdminOrders";
import Checkout from "../components/check-out/Checkout";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import OrderSuccess from "../components/order-success/OrderSuccess";
import Products from "../components/products/Products";
import Register from "../components/register/Register";
import ShoppingCart from "../components/shopping-cart/ShoppingCart";
import Layout from "../components/layout/Layout";
import MyOrders from '../components/my-orders/MyOrders';
import ConfirmationEmail from "../components/comfirmation-email/ConfirmationEmail";
import ProtectedRoute from "../components/ProtectedRoutes/ProtectedRoute";
import AdminProtectedRoute from '../components/ProtectedRoutes/AdminProtectedRoute';
import ProductForm from '../components/admin/products-form/ProductForm';
import LoginRegisterProtectedRoute from '../components/ProtectedRoutes/LoginRegisterProtectedRoute';

const router = createBrowserRouter([
    {path: '', element: <Layout/>, children: [
         {index: true, element: <Home/>},
    {path: 'products', element: <Products/>},
    {path: 'shopping-cart', element: <ShoppingCart/>},
    {path: 'check-out', element: (<ProtectedRoute> <Checkout/> </ProtectedRoute>)},
    {path: 'order-success', element: (<ProtectedRoute> <OrderSuccess/></ProtectedRoute> )},
    {path: 'my/orders', element: <ProtectedRoute> <MyOrders/></ProtectedRoute> },
    {path: 'admin/products', element:( <AdminProtectedRoute><AdminProducts/></AdminProtectedRoute>)},
    {path: 'admin/products/new', element:( <AdminProtectedRoute><ProductForm/></AdminProtectedRoute>)},
    {path: 'admin/orders', element: (<AdminProtectedRoute><AdminOrders/></AdminProtectedRoute>)},
    {path:'*', element: <Home/>}
    ]},
    {path:'*', element: <Layout/>, children:[{index: true, element: <Home/>}]},
    {path: 'login', element: (<LoginRegisterProtectedRoute><Login/></LoginRegisterProtectedRoute>)},
    {path: 'register', element: (<LoginRegisterProtectedRoute><Register/></LoginRegisterProtectedRoute>)},
    {path: 'confirmation-email', element: <ConfirmationEmail/>}
]);

export default router;