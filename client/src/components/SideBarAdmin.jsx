import Menu from './Menu'
import ItemMenu from '../ui/ItemMenu'
import LogoSideBar from '../ui/LogoSideBar'
import MenuOne from './MenuOne'
import { Link } from 'react-router-dom'

export default function SideBarAdmin() {
    return (
        <div className='bg-black h-screen w-[430px] text-[20px] font-bold'>
            <LogoSideBar />
            <Menu title="User" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/user-alt-4.svg">
                <Link to="/register">
                    <ItemMenu actived={true} title="Création" />
                </Link>

                <Link to="/userlist">
                    <ItemMenu actived={true} title="Utilisteurs" />
                </Link>
            </Menu>
            <Link to="/terms">
                <MenuOne title="Contrat" iconeLeft="../src/assets/images/list-alt.svg" />
            </Link>
            <Link to="/">
                <MenuOne title="Exporter BDD" iconeLeft="../src/assets/images/list-alt.svg" />
            </Link>
            <Link to="/">
                <MenuOne title="Importer BDD" iconeLeft="../src/assets/images/list-alt.svg" />
            </Link>
        </div>
    )
}
