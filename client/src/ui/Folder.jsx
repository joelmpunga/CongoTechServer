import React from 'react'
import ContainerFolderFile from './ContainerFolderFile'
import BouttonIcon from './BouttonIcon'

export default function Folder({ title, taille, isToClass = false }) {
    return (
        <ContainerFolderFile >
            <img src="../src/assets/images/icon-folder.png" alt="" width={150} height={150} />
            <div className='flex'>
                <h3 className='mx-auto max-w-[40%] '>{title}</h3>
                {
                    isToClass && <BouttonIcon imageUrl="../src/assets/images/Ok-icon.svg" msg="Classer" taille="w-6 h-6" />
                }
            </div>
        </ContainerFolderFile>
    )
}
