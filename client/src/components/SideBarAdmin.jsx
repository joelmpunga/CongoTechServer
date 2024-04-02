import Menu from './Menu'
import ItemMenu from '../ui/ItemMenu'
import LogoSideBar from '../ui/LogoSideBar'

export default function SideBarAdmin() {
    return (
        <div className='bg-custom-dark-blue mx-8 h-[100%] text-[20px] font-bold mb-4'>
            <LogoSideBar />
            <Menu title="User" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/user-alt-4.svg">
                <ItemMenu actived={true} title="Création" />
                <ItemMenu actived={true} title="Roles" />
                <ItemMenu actived={true} title="Utilisteurs" />
            </Menu>
        </div>
    )
}
