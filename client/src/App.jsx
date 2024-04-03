import FoldersClasser from './components/FoldersClasser'
import FoldersWorkspace from './components/FoldersWorkspace'
import Header from './components/Header'
import LinksPages from './components/LinksPages'
import Mail from './components/Mail'
import SideBarAdmin from './components/SideBarAdmin'
import SideBarSecretaire from './components/SideBarSecretaire'
import StockageMailsDocuments from './components/StockageMailsDocuments'
import SubFoldersWorkspace from './components/SubFoldersWorkspace'
import WorkSpace from './components/WorkSpace'
import File from './ui/File'
import Folder from './ui/Folder'
import ItemLinkPage from './ui/ItemLinkPage'
function App() {
  const data = {
    name: 'Joel MPUNGA',
    date: '2021-01-01',
    address: 'joelmpunga@gmail.com',
  }
  return (
    <>
      <Header hasSearch={true} name="John Doe" title="Secretariat" />
      <Folder title="Folder" />
      <File title="Document" />
      <Mail data={data} />
      <FoldersWorkspace/>
      <SubFoldersWorkspace/>
      <StockageMailsDocuments/>
      <FoldersClasser/>
    </>
  )
}

export default App
