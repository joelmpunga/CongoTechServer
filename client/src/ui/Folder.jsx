import {useState,useEffect} from 'react'
import ContainerFolderFile from './ContainerFolderFile'
import BouttonIcon from './BouttonIcon'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Folder({ title, taille, isToClass = false,idFile,idSub }) {
    const onClickClasser = async () => {
        await axios.put(`http://localhost:3000/file/classer/${idFile}`, { idSub}).then((res) => {
            alert(res.data)
        });
    }
    return (
        <ContainerFolderFile >
            <img src="../src/assets/images/icon-folder.png" alt="" width={150} height={150} />
            <div className='flex'>
                <h3 className='mx-auto max-w-[40%] '>{title}</h3>
                {
                    isToClass && <Link to = "" onClick={onClickClasser}> <BouttonIcon imageUrl="../src/assets/images/Ok-icon.svg" msg="Classer" taille="w-6 h-6" /></Link>
                }
            </div>
        </ContainerFolderFile>
    )
}
