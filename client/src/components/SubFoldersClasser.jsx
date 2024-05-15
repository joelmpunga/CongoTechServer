import { useState, useEffect } from 'react'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import BouttonIcon from '../ui/BouttonIcon'
import axios from 'axios'
import { Link, useParams,useNavigate } from 'react-router-dom'
export default function SubFoldersClasser({ idFolder }) {
    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const params = useParams()
    console.log(params);
    const id = params.id
    const idFile = params.idFile
    const [subFolders, setSubFolders] = useState([])
    const getSubFolders = async () => await axios.get("http://localhost:3000/subfolder/" + params.id).then(res => setSubFolders(res.data))
    useEffect(() => { getSubFolders() }, ['subFolders'])
    console.log(subFolders);
    return (
        <div className='bg-white shadow-2xl mx-6 h-[670px]'>
            <HeaderWorkspace title="Sous dossiers" message="Parcourez les sous dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
                <ItemLinkPage title="Dossiers" path="/folders" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les sous dossiers">
                {
                    subFolders.map(subFolder => (
                        //<Link  to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }}>
                            <Folder key={subFolder.id} title={subFolder.titre} id={subFolder.id} isToClass={true} idFile = {idFile} idSub={subFolder.id}/>
                        //</Link>
                    ))
                }
            </WorkSpace>
            <Link to="/file/draft">

                <div className='w-[95%] flex justify-end gap-2'>
                    <BouttonIcon imageUrl="../src/assets/images/cancel-btn.svg" msg="Annuler" taille="h-10 w-10" />
                </div>
            </Link>
        </div>
    )
}
