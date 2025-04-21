import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';;
import { RouterProvider } from 'react-router-dom';
import router from './routing/routes';
import { Provider } from "react-redux";
import { store } from "./state/store";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap-icons/font/bootstrap-icons.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router}/>  
      </QueryClientProvider>
     
    </Provider>
  </StrictMode>,
)
