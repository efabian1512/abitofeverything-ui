import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';;
import { RouterProvider } from 'react-router-dom';
import router from './routing/routes';
import { Provider } from "react-redux";
import { store, persistor } from "./state/store";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router}/>  
      </QueryClientProvider>
        </PersistGate>
    </Provider>
 // </StrictMode>
)
