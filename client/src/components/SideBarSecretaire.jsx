import React from 'react'
import Menu from './Menu'
import ItemMenu from '../ui/ItemMenu'
import LogoSideBar from '../ui/LogoSideBar'

export default function SideBarSecretaire() {
  return (
    <div className='bg-custom-dark-blue mx-8 h-[100%] text-[20px] font-bold'>
      <LogoSideBar />
      <Menu title="Rapports & Statistiques" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/user-alt-4.svg">
        <ItemMenu actived={true} title="Documents" />
        <ItemMenu actived={true} title="Emails" />
        <ItemMenu actived={true} title="Utilisteurs" />
        <ItemMenu actived={true} title="Clients" />
      </Menu>
      <Menu title="Profil" hasManyMenuItems={false} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/user-alt-4.svg" />
      <Menu title="Dossiers" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/user-alt-4.svg">
        <ItemMenu actived={true} title="Création" />
        <ItemMenu actived={true} title="Dossiers" />
      </Menu>
      <Menu title="Documents" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/user-alt-4.svg">
        <ItemMenu actived={true} title="Archiver" />
        <ItemMenu actived={true} title="Consulter les Docs" />
      </Menu>
      <Menu title="Gestions des Emails" hasManyMenuItems={false} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/user-alt-4.svg" />
    </div>
  )
}
