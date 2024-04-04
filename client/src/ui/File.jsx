import React from 'react'
import ContainerFolderFile from './ContainerFolderFile'
import BouttonIcon from './BouttonIcon'

export default function File({ title,isToClass = false }) {
  return (
    <ContainerFolderFile>
      <div className='flex'>
        <img src="../src/assets/images/icon-file.png" alt="" width={150} height={150} />
        {
          isToClass && <BouttonIcon imageUrl="../src/assets/images/Ok-icon.svg" msg="Classer" taille="w-6 h-6" />
        }
      </div>
      <div className='flex my-4'>
        <h3 className='mx-auto max-w-[40%] '>{title}</h3>
        <div className='flex gap-3'>
          <img src="../src/assets/images/eye.svg" alt="" />
          <img src="../src/assets/images/trash-can-alt-2.svg" alt="" />
          <img src="../src/assets/images/download-alt.svg" alt="" />
        </div>
      </div>
    </ContainerFolderFile>
  )
}
