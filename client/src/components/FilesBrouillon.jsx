import React from 'react'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import Pagination from './Pagination'
import File from '../ui/File'
export default function FilesBrouillon() {
  return (
    <>
            <HeaderWorkspace title="Dossiers" message="Parcourez les dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                <File title="Doc.jpg" isToClass={true}/>
                <File title="Doc.jpg" isToClass={true}/>
                <File title="Doc.jpg" isToClass={true}/>
                <File title="Doc.jpg" isToClass={true}/>
                <File title="Doc.jpg" isToClass={true}/>
                <File title="Doc.jpg" isToClass={true}/>
                <File title="Doc.jpg" isToClass={true}/>
                <File title="Doc.jpg" isToClass={true}/>
                <File title="Doc.jpg" isToClass={true}/>
            </WorkSpace>
            <Pagination/>
        </>
  )
}
