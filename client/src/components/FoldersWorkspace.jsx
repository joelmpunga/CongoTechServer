import { useEffect, useState } from 'react'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { useMyContext } from '../contexts/MyContext';
import ItemMenu from '../ui/ItemMenu'


export default function FoldersWorkspace() {
    const { isAuthenticated, updateIsAuthenticated } = useMyContext();
    console.log("folder", isAuthenticated);
    const navigate = useNavigate()
    if (!isAuthenticated) {
        navigate('/login')
    }
    const [folders, setFolders] = useState([])
    const getFolders = async () => await axios.get("http://localhost:3000/folder").then(res => setFolders(res.data))
    useEffect(() => { getFolders() }, ['folders'])
    // const getFolders = async () => await axios.get("http://localhost:3000/profile", {
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     }
    // }).then(res => setFolders(res.data))
    return (
        <>
            <Link to="/createfolder">
                <button className='bg-blue-600 rounded-2xl w-[150px] h-[50px] ml-10 text-white'>
                    Création
                </button>
            </Link>
            <HeaderWorkspace title="Dossiers" message="Parcourez les dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
                <div className='flex flex-wrap w-[100%] overflow-x-auto h-[70%]'>
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
