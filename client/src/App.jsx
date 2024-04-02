import Header from './components/Header'
import LinksPages from './components/LinksPages'
import Mail from './components/Mail'
import SideBarAdmin from './components/SideBarAdmin'
import SideBarSecretaire from './components/SideBarSecretaire'
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
      <WorkSpace message="Parcourez les dossiers">
          <Folder title="Folder 1" />
          <Folder title="Folder 2" />
          <Folder title="Folder 3" />
          <Folder title="Folder 4" />
          <Folder title="Folder 5" />
          <Folder title="Folder 6" />
      </WorkSpace>
    </>
  )
}

export default App
