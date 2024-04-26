import { useState, useEffect } from 'react'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import { Link, useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function SubFoldersWorkspace() {
    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const params = useParams()
    console.log(params.id);
    const [subFolders, setSubFolders] = useState([])
    const getSubFolders = async () => await axios.get("http://localhost:3000/subfolder/" + params.id).then(res => setSubFolders(res.data))
    useEffect(() => { getSubFolders() }, ['subFolders'])
    console.log(subFolders);
    return (
        <>
            <HeaderWorkspace title="Sous dossiers" >
                <ItemLinkPage title="Dashboard" path="/dashboard" />
                <ItemLinkPage title="Dossiers" path="/folders" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les sous dossiers">
                <div className='flex flex-wrap w-[100%] overflow-x-auto h-[70%]'>
                    {
                        subFolders.map(subFolder => (
                            <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row'>
                                <Folder title={subFolder.titre} id={subFolder.id} />
                            </Link>
                        ))
                    }
                </div>
            </WorkSpace>
        </>
    )
}
