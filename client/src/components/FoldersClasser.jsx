import {useState,useEffect} from 'react'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import BouttonPagination from '../ui/BouttonPagination'
import Popup from './Popup'
import BouttonIcon from '../ui/BouttonIcon'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function FoldersClasser() {
    const [folders, setFolders] = useState([])
    const getFolders = async () => await axios.get("http://localhost:3000/folder").then(res => setFolders(res.data))
    useEffect(() => { getFolders() }, ['folders'])
    return (
        <>
            <HeaderWorkspace title="Classer Dossiers" message="Parcourez les dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                    <div className='w-[1500px]'>
                    {
                        folders.map(folder => (
                            <Link key={folder.id} to={{ pathname: `/subfolderclasser/${folder.id}`, state: { id: folder.id } }}>
                                <Folder title={folder.titre} id={folder.id} />
                            </Link>
                        ))
                    }
                </div>
            </WorkSpace>
            <div className='flex justify-end gap-2'>
                <BouttonPagination />
            </div>
            <Popup />
            <Link to="/file/draft">

                <div className='w-[95%] flex justify-end gap-2'>
                    <BouttonIcon imageUrl="../src/assets/images/cancel-btn.svg" msg="Annuler" taille="h-10 w-10" />
                </div>
            </Link>
        </>
    )
}
