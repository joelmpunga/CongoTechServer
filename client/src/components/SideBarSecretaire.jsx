import React from 'react'
import Menu from './Menu'
import ItemMenu from '../ui/ItemMenu'

export default function SideBarSecretaire() {
  return (
    <>
      <Menu title="Rapports & Statistiques" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/user-alt-4.svg">
        <ItemMenu actived={true} title="Documents"/>
        <ItemMenu actived={true} title="Documents"/>
        <ItemMenu actived={true} title="Documents"/>
      </Menu>
      <Menu title="Rapports & Statistiques" hasManyMenuItems={true} hasNumberCount={false} iconeRightOff="../src/assets/images/chevron-down.svg" iconeRightOn="../src/assets/images/chevron-up.svg" iconeLeft="../src/assets/images/user-alt-4.svg">
        <ItemMenu actived={true} title="Documents"/>
      </Menu> 
    </>
  )
}
