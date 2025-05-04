import Menu from './Menu'
import ItemMenu from '../ui/ItemMenu'
import LogoSideBar from '../ui/LogoSideBar'
import MenuOne from './MenuOne'
import { Link, useNavigate } from 'react-router-dom'

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
        <Link to="/charts/doc">
          <MenuOne title="Dashboard" iconeLeft="../src/assets/images/Group.svg"></MenuOne>
        </Link>
        <Link to="/folder">
          <MenuOne title="Dossiers" iconeLeft="../src/assets/images/list-alt.svg" />
        </Link>
          <Menu title="Documents" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/page.svg">
            <Link to="/archive">
              <ItemMenu actived={true} title="Archiver" />
            </Link>
            <Link to="/file/draft">
              <ItemMenu actived={true} title="Brouillon des Docs" />
            </Link>
          </Menu>
          <Link to="/years">
            <MenuOne title="Années Scolaires" iconeLeft="../src/assets/images/list-alt.svg" />
          </Link>
          <Link to="/terms">
            <MenuOne title="Contrat" iconeLeft="../src/assets/images/list-alt.svg" />
          </Link>
      </div>
    </div >
  )
}
