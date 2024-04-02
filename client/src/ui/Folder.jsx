import React from 'react'
import ContainerFolderFile from './ContainerFolderFile'

export default function Folder({ title, taille }) {
    return (
        <ContainerFolderFile >
            <img src="../src/assets/images/icon-folder.png" alt="" width={150} height={150}/>
            <h3 className='mx-auto max-w-[40%] '>{title}</h3>
        </ContainerFolderFile>

    )
}
