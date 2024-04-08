import { useEffect, useState } from 'react'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function FoldersWorkspace() {
    const [folders, setFolders] = useState([])
    const getFolders = async () => await axios.get("http://localhost:3000/folder").then(res => setFolders(res.data))
    useEffect(() => { getFolders() }, ['folders'])
    console.log(folders);
    // const getFolders = async () => await axios.get("http://localhost:3000/profile", {
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     }
    // }).then(res => setFolders(res.data))
    return (
        <>
            <HeaderWorkspace title="Dossiers" message="Parcourez les dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                <div className='w-[1500px]'>
                    {
                        folders.map(folder => (
                            <Link key={folder.id} to={{ pathname: `/subfolder/${folder.id}`, state: { id: folder.id } }}>
                                <Folder title={folder.titre} id={folder.id} />
                            </Link>
                        ))
                    }
                </div>
            </WorkSpace>
        </>
    )
}
