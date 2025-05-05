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
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <PayPalScriptProvider
        options={{
          locale:'en_US',
          currency: 'USD',
          clientId: 'Ad1pbO0qnLG1DsrQz_kClXKRaXDgPu2QBYHO3EQJ7Hqjmos2TXKehSJHlrexOjd4N0oyDEXScPJd8Ozd'
        }}
      >
        <QueryClientProvider client={queryClient}>
           <RouterProvider router={router}/>
        </QueryClientProvider>
      </PayPalScriptProvider>
        </PersistGate>
    </Provider>
 // </StrictMode>
)
