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

const router = createBrowserRouter([
    {path: '', element: <Layout/>, children: [
         {index: true, element: <Home/>},
    {path: 'products', element: <Products/>},
    {path: 'shopping-cart', element: <ShoppingCart/>},
    {path: 'check-out', element: <Checkout/>},
    {path: 'order-success', element: <OrderSuccess/>},
    {path: 'my/orders', element: <MyOrders/>},
    {path: 'admin/products', element: <AdminProducts/>},
    {path: 'admin/orders', element: <AdminOrders/>},
    {path:'*', element: <Home/>}
    ]},
    {path:'*', element: <Layout/>, children:[{index: true, element: <Home/>}]},
    {path: 'login', element: <Login/>},
    {path: 'register', element: <Register/>},
    {path: 'confirmation-email', element: <ConfirmationEmail/>}
]);

export default router;