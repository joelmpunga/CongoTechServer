import { useEffect, useState } from 'react'
import Title from './archDoc/Title'
import PopupAlert from '../ui/Popup'
import ArchDocComp from './archDoc/ArchDocComp'
import Inputs from './archDoc/Inputs'
import axios from 'axios'
import { useMyContext } from '../contexts/MyContext'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function CreateSubfolder({ classValue }) {
    const idfile = useParams
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
    const handleChangeDescriptionFolder = (event) => {
        setDescFold(event.target.value)
    }


    const handleChangeDescriptionSubFolder = (event) => {
        setDescSubFold(event.target.value)
    }
    const handleChangeNomFolder = (event) => {
        setNomFold(event.target.value)
    }
    const handleChangeNomSubFolder = (event) => {
        setNomSubFold(event.target.value)
    }

    const getAllFolders = async (event) => {
        await axios.get('http://localhost:3000/folder/').then(res => setFolders(res.data))
    }
    const handleSubmitFolder = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/folder/create', {
            
            description: descFold,
            titre: nomFold
        }).then(res => {
            if (res.status === 200) {
                window.location.href = '/createfolder'
            }
        }).catch(err => {
            setErrorFolder(true)
            setErrorMessageFolder(err.response.data)
        })
    }
    const handleSubmitSubFolder = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/subfolder/create', {
            description: subDescFold,
            titre: nomSubFold,
            idFolder: parentFolder
        }).then(res => {
            console.log(res.data, res.status);
            if (res.status === 200) {
                window.location.href = '/createfolder'
            }
        }).catch(err => {
            setErrorSubFolder(true)
            setErrorMessageSubFolder(err.response.data)
        })
    }
    useEffect(() => {
        handleChangeDescriptionFolder
        handleChangeNomFolder
        handleSubmitFolder

    }, ['descFold', 'nomFold'])

    useEffect(() => {
        getAllFolders()
    }, ['folders'])



    return (
        <div className={classValue}>
            
                <div className="w-[650px] border border-gray-200 shadow-md mx-auto my-auto">
                    <Title title='Création d’un sous dossier' />

                    <ArchDocComp 
                    onChange={handleChangeDescriptionSubFolder} 
                    onSubmit={handleSubmitSubFolder}
                    className=" bg-gray-200 resize-none p-5 w-full h-32 my-5 border-1  border-blue outline-none"
                    >
                        <Inputs attName='Nom du sous dossier' onChange={handleChangeNomSubFolder}>

                        </Inputs>
                    </ArchDocComp>
                </div>
        </div>
    )
}
