import { useEffect, useState } from 'react'
import Title from './archDoc/Title'
import PopupAlert from '../ui/Popup'
import ArchDocComp from './archDoc/ArchDocComp'
import Inputs from './archDoc/Inputs'
import axios from 'axios'
import { useMyContext } from '../contexts/MyContext'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function CreateSubfolder({ classValue, annuler }) {
    const params = useParams()
    const id = parseInt(params.id)
    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    const [descFold, setDescFold] = useState('')
    const [subDescFold, setDescSubFold] = useState('')
    const [nomFold, setNomFold] = useState('')
    const [nomSubFold, setNomSubFold] = useState('')
    const [folders, setFolders] = useState([])
    const [parentFolder, setParentFolder] = useState('')
    const [errorFolder, setErrorFolder] = useState(false)
    const [errorMessageFolder, setErrorMessageFolder] = useState('')
    const [errorSubFolder, setErrorSubFolder] = useState(false)
    const [errorMessageSubFolder, setErrorMessageSubFolder] = useState('')




    const handleChangeNomSubFolder = (event) => {
        setNomSubFold(event.target.value)
    }
    const handleChangeDescriptionSubFolder = (event) => {
        setDescSubFold(event.target.value)
    }
    const handleSubmitSubFolder = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/subfolder/create', {
            description: subDescFold,
            titre: nomSubFold,
            idFolder: id
        }).then(res => {
            if (res.status === 200) {
                window.location.href = '/subfolder/'+id
            }
        }).catch(err => {
            setErrorSubFolder(true)
            setErrorMessageSubFolder(err.response.data)
        })
    }


    return (
        <div className={classValue}>
            
                <div className="w-[650px] border bg-white border-gray-200 shadow-md mx-auto my-auto">
                    <Title title='Création d’un sous dossier' />

                    <ArchDocComp 
                    onChange={handleChangeDescriptionSubFolder} 
                    onSubmit={handleSubmitSubFolder}
                    className=" bg-gray-200 resize-none p-5 w-full h-32 my-5 border-1  border-blue outline-none"
                    annuler={annuler}
                    >
                        <Inputs attName='Nom du sous dossier' onChange={handleChangeNomSubFolder}>

                        </Inputs>
                    </ArchDocComp>
                </div>
        </div>
    )
}
