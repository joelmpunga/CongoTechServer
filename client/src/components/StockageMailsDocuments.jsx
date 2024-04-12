import { useState, useEffect } from 'react'
import Mail from './Mail'
import File from '../ui/File'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function StockageMailsDocuments() {
    const data = {
        "name": "Joel MPUNGA",
        "date": "2021-05-20",
        "address": "joelmpunga@gmail.com"
    }
    const params = useParams()
    const id = parseInt(params.id)
    const [files, setFiles] = useState([])
    const getFiles = async () => await axios.get("http://localhost:3000/file/" + id).then(res => setFiles(res.data))
    useEffect(() => { getFiles() }, ['files'])
    console.table(files);
    return (
        <div>
            <HeaderWorkspace title="Documents & Mails" message="Parcourez les fichiers et mails">
                <ItemLinkPage title="Dashboard" path="/dashboard" />
                <ItemLinkPage title="Dossiers" path="/folders" />
                <ItemLinkPage title="Sous Dossiers" path="/subfolders" />
            </HeaderWorkspace>
            <WorkSpace message="Parcourez les sous dossiers">
                {
                    files.map(file => (
                        <tr key={file.id}>
                            <File id={file.id} title={file.name} />
                        </tr>
                    ))
                }
            </WorkSpace>
        </div>
    )
}
