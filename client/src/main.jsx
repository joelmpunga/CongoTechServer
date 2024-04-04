import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FoldersWorkspace from './components/FoldersWorkspace.jsx'
import Error404 from './components/404Error.jsx'
import SubFoldersWorkspace from './components/SubFoldersWorkspace.jsx'
import StockageMailsDocuments from './components/StockageMailsDocuments.jsx'
const router = createBrowserRouter([
  {
    path: "/login",
    element: <></>,
    errorElement: <Error404 />,
  },
  {
    path: '/',
    element: <App><Outlet /></App>,
    children: [
      {
        path: "/folder",
        element: <FoldersWorkspace />,
        errorElement: <Error404 />,
      },
      {
        path: "/folder/subfolder",
        element: <SubFoldersWorkspace />,
        errorElement: <Error404 />,
      },
      {
        path: "subfolder/files",
        element: <StockageMailsDocuments />,
        errorElement: <Error404 />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
