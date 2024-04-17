import {useState,useEffect} from 'react'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import Pagination from './Pagination'
import File from '../ui/File'
import axios from 'axios'
import { Link, useNavigate } from'react-router-dom'
import { useMyContext } from '../contexts/MyContext';
export default function FilesBrouillon() {
  const { isAuthenticated, updateIsAuthenticated } = useMyContext();
    console.log("folder", isAuthenticated);
    const navigate = useNavigate()
    if (!isAuthenticated) {
        navigate('/login')
    }
  const [files,setFiles] = useState([])
    const getFiles = async() => await axios.get("http://localhost:3000/file/draft").then(res=>setFiles(res.data))
    useEffect(()=>{getFiles()},['files'])
  return (
    <>
            <HeaderWorkspace title="Dossiers" message="Parcourez les dossiers">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les dossiers">
              {
                files.map(file => (
                  <tr key={file.id}>
                    <File id={file.id} title={file.name} isToClass={true}/>
                  </tr>
                ))
              }
            </WorkSpace>
            <Pagination/>
        </>
  )
}
