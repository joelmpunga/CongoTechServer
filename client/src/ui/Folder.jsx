import React from 'react'
import ContainerFolderFile from './ContainerFolderFile'
import BouttonIcon from './BouttonIcon'
import { Link } from 'react-router-dom'

export default function Folder({ title, taille, isToClass = false }) {
    return (
        <ContainerFolderFile >
            <img src="../src/assets/images/icon-folder.png" alt="" width={150} height={150} />
            <div className='flex'>
                <h3 className='mx-auto max-w-[40%] '>{title}</h3>
                {
                    isToClass && <Link to = "/subfolder/files"> <BouttonIcon imageUrl="../src/assets/images/Ok-icon.svg" msg="Classer" taille="w-6 h-6" /></Link>
                }
            </div>
        </ContainerFolderFile>
    )
}
