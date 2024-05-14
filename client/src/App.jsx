import { Children, useState } from 'react'
import FilesBrouillon from './components/FilesBrouillon'
import FoldersClasser from './components/FoldersClasser'
import FoldersWorkspace from './components/FoldersWorkspace'
import Header from './components/Header'
import LinksPages from './components/LinksPages'
import Mail from './components/Mail'
import MailBrouillon from './components/MailBrouillon'
import MailsBrouillonAll from './components/MailsBrouillonAll'
import SideBarAdmin from './components/SideBarAdmin'
import SideBarSecretaire from './components/SideBarSecretaire'
import StockageMailsDocuments from './components/StockageMailsDocuments'
import SubFoldersClasser from './components/SubFoldersClasser'
import SubFoldersWorkspace from './components/SubFoldersWorkspace'
import WorkSpace from './components/WorkSpace'
import File from './ui/File'
import Folder from './ui/Folder'
import ItemLinkPage from './ui/ItemLinkPage'
import { useMyContext } from './contexts/MyContext'
import { useNavigate } from 'react-router-dom'


function App({ children, getUserData }) {
  //const { isAuthenticated, updateIsAuthenticated,role,updateRole,nom,updateNom,postnom,updatePostNom } = useMyContext();
  const nom = localStorage.getItem('nom');
  const postnom = localStorage.getItem('postnom');
  const role = localStorage.getItem('role');
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const navigate = useNavigate()
  if (!isAuthenticated) {
    navigate("/login");
  }
  return (
    <>
      <div className='flex gap-0 w-full fixed'>
        {
          role==='ADMIN'?<SideBarAdmin />:<SideBarSecretaire />
        }
        {/* <SideBarSecretaire /> */}
        <div className='flex flex-col w-full bg-slate-200'>
          <Header hasSearch={true} name={nom + " " + postnom} title={role} />
          {
            children
          }
        </div>
      </div>

      {/* <Folder title="Folder" />
      <File title="Document" />
      <Mail data={data} />
      <FoldersWorkspace />
      <SubFoldersWorkspace />
      <StockageMailsDocuments />
      <FoldersClasser />
      <MailsBrouillonAll />
      <SubFoldersClasser />
      <FilesBrouillon /> */}
    </>
  )
}

export default App
