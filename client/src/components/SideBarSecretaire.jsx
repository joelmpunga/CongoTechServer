import Menu from './Menu'
import ItemMenu from '../ui/ItemMenu'
import LogoSideBar from '../ui/LogoSideBar'
import { Link,useNavigate } from 'react-router-dom'

export default function SideBarSecretaire() {
  const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
  return (

    <div className='bg-custom-dark-blue min-h-screen w-[430px] text-[20px] font-bold'>
      <LogoSideBar />
      <div className='overflow-x-hidden h-[70%]'>

        <Menu title="Rapports & Statistiques" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/Group.svg">
          <ItemMenu actived={true} title="Documents" />
          <ItemMenu actived={true} title="Emails" />
          <ItemMenu actived={true} title="Utilisteurs" />
          <ItemMenu actived={true} title="Clients" />
        </Menu>
        <Link to="/folder">
          <Menu title="Dossiers" hasManyMenuItems={false} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/list-alt.svg" />
        </Link>
        <Menu title="Documents" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/page.svg">
          <Link to="/archive">
            <ItemMenu actived={true} title="Archiver" />
          </Link>
          <Link to="/file/draft">
            <ItemMenu actived={true} title="Brouillon des Docs" />
          </Link>
        </Menu>
        <Link to="/mailsdraft">
          <Menu title="Emails" hasManyMenuItems={false} hasNumberCount={true} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/envelope.svg" number="6" />
        </Link>
      </div>
    </div >
  )
}
