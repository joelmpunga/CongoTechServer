import { useState, useEffect } from 'react'
import ContainerFolderFile from './ContainerFolderFile'
import BouttonIcon from './BouttonIcon'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function File({ title,data, isToClass = false, id }) {
  console.log(id);
  const [files, setFiles] = useState("")
  const getFiles = async () => {
    return await axios.get("http://localhost:3000/file/download/" + id).then(res => setFiles(res.data))
  }
  return (
    <ContainerFolderFile>
      <div className='flex'>
        <img src="../src/assets/images/icon-file.png" alt="" width={150} height={150} />
        {
          isToClass &&
          <Link key={id} to={{ pathname: `/folderclasser/${id}`, state: { id: id } }} className='flex flex-row'>
            <BouttonIcon imageUrl="../src/assets/images/Ok-icon.svg" msg="Classer" taille="w-6 h-6" />
          </Link>
        }
      </div>
      <div className='flex flex-col my-4'>
        <h3 className='mx-auto max-w-[90%] text-wrap '>{title}</h3>
        <div className='flex gap-3 mx-auto max-w-[40%] text-wrap'>
          <img src="../src/assets/images/eye.svg" alt="" />
          <img src="../src/assets/images/trash-can-alt-2.svg" alt="" />
          {
            <img src="../src/assets/images/download-alt.svg" alt="" onClick={getFiles} />
          }

        </div>
      </div>
    </ContainerFolderFile>
  )
}
