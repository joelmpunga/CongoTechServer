import Menu from './Menu'
import ItemMenu from '../ui/ItemMenu'
import LogoSideBar from '../ui/LogoSideBar'
import MenuOne from './MenuOne'
import { Link,useNavigate } from 'react-router-dom'

export default function SideBarSecretaire() {
  const navigate = useNavigate()
  const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
  if (!isAuthenticatedLocalStorage) {
    navigate('/login')
  }
  return (

    <div className='bg-gray-700 min-h-screen w-[430px] text-[20px] font-bold'>
      <LogoSideBar />
      <div className='flex flex-col gap-2 overflow-x-hidden h-[70%]'>
        <Menu title="Statistiques" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/Group.svg">
          <Link to="/charts/doc">
            <ItemMenu actived={true} title="Documents" />
          </Link>
          <Link to="/charts/mail">
            <ItemMenu actived={true} title="Emails" />
          </Link>
          <Link to="/charts/user">
            <ItemMenu actived={true} title="Utilisteurs" />
          </Link>
          <Link to="/charts/client">
            <ItemMenu actived={true} title="Clients" />
          </Link>
        </Menu>
        
        <Link to="/folder">
          <MenuOne title="Dossiers"  iconeLeft="../src/assets/images/list-alt.svg" />
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
          <MenuOne title="Emails" iconeLeft="../src/assets/images/envelope.svg" />
        </Link>
      </div>
    </div >
  )
}
