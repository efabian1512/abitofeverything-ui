import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';;
import { RouterProvider } from 'react-router-dom';
import router from './routing/routes';
//import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>   
  </StrictMode>,
)
