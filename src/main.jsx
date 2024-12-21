import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
 

import {
  RouterProvider,
} from "react-router-dom";
import Router from './Route/Router.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Router}></RouterProvider>
      <Toaster position='top-right' reverseOrder={false} />
    </AuthProvider>
  </StrictMode>,
)
