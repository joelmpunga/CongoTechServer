import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider, BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FoldersWorkspace from './components/FoldersWorkspace.jsx'
import Error404 from './components/404Error.jsx'
import SubFoldersWorkspace from './components/SubFoldersWorkspace.jsx'
import StockageMailsDocuments from './components/StockageMailsDocuments.jsx'
import FoldersClasser from './components/FoldersClasser.jsx'
import FilesBrouillon from './components/FilesBrouillon.jsx'
import SubFoldersClasser from './components/SubFoldersClasser.jsx'
import MailsBrouillonAll from './components/MailsBrouillonAll.jsx'
import SignInSignUpComp from './components/signInSignUpComp/SignInSignUpComp.jsx'
import InputsForm from './components/signInSignUpComp/InputsForm.jsx'
import Login from './components/signInSignUpComp/Login.jsx'
import SignUp from './components/signInSignUpComp/SignUp.jsx'
import ArchDocs from './components/archDoc/ArchDocs.jsx'
import CreatFolder from './components/CreatFolder.jsx'
const router = createBrowserRouter([
  {
    path: "/login",
    element:
      <>
        <Login />
      </>,
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
        path: "/archive",
        element: <ArchDocs />,
        errorElement: <Error404 />,
      },
      {
        path: "/createfolder",
        element: <CreatFolder />,
        errorElement: <Error404 />,
      },
      {
        path: "/folder/subfolder",
        element: <SubFoldersWorkspace />,
        errorElement: <Error404 />,
      },
      {
        path: "subfolder/:id",
        element: <SubFoldersWorkspace />,
        errorElement: <Error404 />,
      },
      {
        path: "/file/draft",
        element: <FilesBrouillon />,
        errorElement: <Error404 />,
      },
      {
        path: "/folderclasser",
        element: <FoldersClasser />,
        errorElement: <Error404 />,
      },
      {
        path: "/subfolderclasser",
        element: <SubFoldersClasser />,
        errorElement: <Error404 />,
      },
      {
        path: "/file/:id",
        element: <StockageMailsDocuments />,
        errorElement: <Error404 />,
      },
      {
        path: "/mailsdraft",
        element: <MailsBrouillonAll />,
        errorElement: <Error404 />,
      },
      {
        path: "/register",
        element: <><SignUp/></>,
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
  </React.StrictMode>
)
