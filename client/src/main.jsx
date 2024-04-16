import React, { useContext } from 'react'
import { createBrowserRouter, Outlet, RouterProvider, BrowserRouter } from 'react-router-dom'
import { MyProvider } from './contexts/MyContext';
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
import Login from './components/signInSignUpComp/Login.jsx'
import SignUp from './components/signInSignUpComp/SignUp.jsx'
import ArchDocs from './components/archDoc/ArchDocs.jsx'
import CreatFolder from './components/CreatFolder.jsx'
import OwnerListDocs from './components/OwnerListDocs.jsx'
import UserList from './components/UserList.jsx'
const router = createBrowserRouter([
  {
    path: "/login",
    element:
      <>
        <MyProvider><Login /></MyProvider>
      </>,
    errorElement: <MyProvider><Error404 /></MyProvider>,
  },
  {
    path: '/',
    element: <MyProvider><App ><Outlet /></App></MyProvider>,
    children: [
      {
        path: "/folder",
        element:  <FoldersWorkspace  />,
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
        path: "/folderclasser/:id",
        element: <FoldersClasser />,
        errorElement: <Error404 />,
      },
      {
        path: "/subfolderclasser/:id/:idFile",
        element: <><SubFoldersClasser /></>,
        errorElement: <><Error404 /></>,
      },
      {
        path: "/file/:id",
        element: <><StockageMailsDocuments /></>,
        errorElement: <><Error404 /></>,
      },
      {
        path: "/mailsdraft",
        element: <><MailsBrouillonAll /></>,
        errorElement: <><Error404 /></>,
      },
      {
        path: "/register",
        element: <><SignUp /></>,
        errorElement: <><Error404 /></>,
      },
      {
        path: "/ownerlist",
        element: <><OwnerListDocs /></>,
        errorElement: <><Error404 /></>,
      },
      {
        path: "/userlist",
        element: <><UserList /></>,
        errorElement: <><Error404 /></>,
      },
      {
        path: '*',
        errorElement: <><Error404 /></>,
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
