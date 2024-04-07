import React from 'react'
import Menu from './Menu'
import ItemMenu from '../ui/ItemMenu'
import LogoSideBar from '../ui/LogoSideBar'
import { Link } from 'react-router-dom'

export default function SideBarSecretaire() {
  return (
    <div className='bg-custom-dark-blue min-h-[876px] w-[500px] text-[20px] font-bold'>
      <LogoSideBar />
      <Menu title="Rapports & Statistiques" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/Group.svg">
        <ItemMenu actived={true} title="Documents" />
        <ItemMenu actived={true} title="Emails" />
        <ItemMenu actived={true} title="Utilisteurs" />
        <ItemMenu actived={true} title="Clients" />
      </Menu>
      <Menu title="Profil" hasManyMenuItems={false} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/user-alt-4.svg" />
      <Menu title="Dossiers" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/list-alt.svg">
        <ItemMenu actived={true} title="Création" />
        <Link to="/folder">
          <ItemMenu actived={true} title="Dossiers" />
        </Link>
      </Menu>
      <Menu title="Documents" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/page.svg">
        <ItemMenu actived={true} title="Archiver" />
        <Link to="/file/draft">
          <ItemMenu actived={true} title="Brouillon des Docs" />
        </Link>
      </Menu>
      <Link to="/mailsdraft">
        <Menu title="Gestions des Emails" hasManyMenuItems={false} hasNumberCount={true} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/envelope.svg" number="6" />
      </Link>
    </div>
  )
}
