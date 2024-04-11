import {useState,useEffect} from 'react'
import WorkSpace from './WorkSpace'
import Folder from '../ui/Folder'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
export default function SubFoldersWorkspace() {
    //const id = location.pathname.match(/[0-9]$/)[0];
    const params = useParams()
    console.log(params.id);
    const [subFolders,setSubFolders] = useState([])
    const getSubFolders = async() => await axios.get("http://localhost:3000/subfolder/"+params.id).then(res=>setSubFolders(res.data))
    useEffect(()=>{getSubFolders()},['subFolders'])
    console.log(subFolders);
    return (
        <>
            <HeaderWorkspace title="Sous dossiers" message="Parcourez les sous dossiers">
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

{
                    subFolders.map(subFolder => (
                        <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row'>
                            <Folder title={subFolder.titre} id={subFolder.id} />
                        </Link>
                    ))
                }

{
                    subFolders.map(subFolder => (
                        <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row'>
                            <Folder title={subFolder.titre} id={subFolder.id} />
                        </Link>
                    ))
                }


{
                    subFolders.map(subFolder => (
                        <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row'>
                            <Folder title={subFolder.titre} id={subFolder.id} />
                        </Link>
                    ))
                }


{
                    subFolders.map(subFolder => (
                        <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row'>
                            <Folder title={subFolder.titre} id={subFolder.id} />
                        </Link>
                    ))
                }  {
                    subFolders.map(subFolder => (
                        <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row'>
                            <Folder title={subFolder.titre} id={subFolder.id} />
                        </Link>
                    ))
                }  {
                    subFolders.map(subFolder => (
                        <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row'>
                            <Folder title={subFolder.titre} id={subFolder.id} />
                        </Link>
                    ))
                }  {
                    subFolders.map(subFolder => (
                        <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row'>
                            <Folder title={subFolder.titre} id={subFolder.id} />
                        </Link>
                    ))
                }  {
                    subFolders.map(subFolder => (
                        <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row'>
                            <Folder title={subFolder.titre} id={subFolder.id} />
                        </Link>
                    ))
                }  {
                    subFolders.map(subFolder => (
                        <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row'>
                            <Folder title={subFolder.titre} id={subFolder.id} />
                        </Link>
                    ))
                }

{
                    subFolders.map(subFolder => (
                        <Link key={subFolder.id} to={{ pathname: `/file/${subFolder.id}`, state: { id: subFolder.id } }} className='flex flex-row'>
                            <Folder title={subFolder.titre} id={subFolder.id} />
                        </Link>
                    ))
                }

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
