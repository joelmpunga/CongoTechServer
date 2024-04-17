import ArchDocComp from "./ArchDocComp";
import DragComponent from "./DragDrop/DragComponent";
import Title from "./Title";
import Inputs from "./Inputs";
import CbxInput from "./comboBox/CbxInput";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../contexts/MyContext";

export default function ArchDocs() {
    const navigate = useNavigate();
    const { isAuthenticated, updateIsAuthenticated } = useMyContext();
    if (!isAuthenticated) {
        navigate('/login')
    }
    const [descOwner, setDescOwner] = useState('')
    const [nameOwner, setNameOwner] = useState('')
    const [typeOwner, setTypeOwner] = useState('')
    const [owners, setOwners] = useState([])
    const [selectedOwner, setSelectedOwner] = useState('')
    const [nameDocs, setNameDocs] = useState('')
    const [docsDesc, setDocsDesc] = useState('')
    const [file, setFile] = useState([])
    const [filesInput, setFilesInput] = useState([])
    const handleChangeType = (event) => {
        setTypeOwner(event.target.value)
    }
    const handleChangeDesc = (event) => {
        setDescOwner(event.target.value)
    }
    const handleChangeName = (event) => {
        setNameOwner(event.target.value)
    }
    const handleChangeSelectedOwner = (event) => {
        setSelectedOwner(event.target.value)
    }
    const handleChangeFileDocs = (data) => {
        setFile(data)
    }
    const handleChangeDocDesc = (event) => {
        setDocsDesc(event.target.value)
    }
    const handleChangeDocInput = (event) => {
        setFilesInput(event.target.files[0])
    }

    const getAllOwners = async (event) => {
        await axios.get('http://localhost:3000/owner').then((res) => { setOwners(res.data) })
    }
    useEffect(() => {
        getAllOwners()
    }, ['owners'])
    useEffect((event) => {
        handleChangeDesc
        handleChangeName
        handleChangeType
    }, ['typeOwner', 'nameOwner', 'descOwner'])
    const handleSubmitOwner = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/owner/create', {
            nom: nameOwner,
            description: descOwner,
            type: typeOwner
        }).then(res => {
            if (res.status === 200) {
                navigate('/archive')
            }
        })
    }
    const handleSubmitDocument = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        console.log(token);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('idOwner', parseInt(selectedOwner));
            formData.append('description', docsDesc);
            formData.append('idUser', 1);
      
            // Remplacez l'URL ci-dessous par l'URL de votre serveur
            await axios.post('http://localhost:3000/file/upload', formData).then(res => {
                    if (res.status === 201) {
                        navigate('/archive')
                    }
                })
          } catch (error) {
            console.error('Erreur lors du téléchargement du fichier :', error);
          }
        // axios.post('http://localhost:3000/file/upload', {
        //     description: descOwner,
        //     file: filesInput,
        //     idOwner: parseInt(selectedOwner),
        //     idUser: 1,
        // }).then(res => {
        //     alert(res.status)
        //     if (res.status === 200) {
        //         window.location.href = '/archive'
        //     }
        // })
    }
    //console.log(descOwner, nameOwner, typeOwner);
    // console.log(filesInput);
    console.log("input",filesInput);
    console.log("swal",file)
    return (
        <>
            {/* tilte, dragDrop, ownNametypeDoc, attName */}

            <div className="m-5 flex flex-row justify-between ">
                <h2>Archiver les documents</h2>
                <p>Dashboard / Archiver</p>
            </div>
            <div className="flex gap-10 w-full justify-center">
                <div className="w-[650px] border border-gray-200 shadow-md">
                    <form action="" encType="multipart/form-data">
                        <Title title='Information du document' />
                        <ArchDocComp onChange={handleChangeDocDesc} onSubmit={handleSubmitDocument}
                            className=" bg-gray-200 resize-none p-5 w-full h-[120px] my-5 border-1  border-blue outline-none"
                        >
                            <CbxInput ownNametypeDoc='Nom du proprietaire' onChange={handleChangeSelectedOwner} className='w-full h-14' >
                                <option value=""></option>
                                {
                                    owners.map(owner => (
                                        <option key={owner.id} value={owner.id}>{owner.nom}</option>
                                    ))
                                }
                            </CbxInput>
                            <DragComponent getFile={handleChangeFileDocs} />
                        </ArchDocComp>
                    </form>
                </div>
                <div className="w-[650px] border border-gray-200 shadow-md">
                    <Title title='Ajouter un propriétaire' />
                    <ArchDocComp ownNametypeDoc='Type du proprietaire' attName='Nom' onChange={handleChangeDesc} onSubmit={handleSubmitOwner}
                        className=" bg-gray-200 resize-none p-5 w-full h-42 my-5 border-1  border-blue outline-none"
                    >
                        <Inputs attName='Nom à attribuer au document' onChange={handleChangeName}>
                            <CbxInput ownNametypeDoc='Type du proprietaire' className='w-[300px] h-14' onChange={handleChangeType}>
                                <option value=""></option>
                                <option value="Entreprise">Entreprise</option>
                                <option value="Particulier">Particulier</option>
                            </CbxInput>
                        </Inputs>
                    </ArchDocComp>
                </div>
            </div>
        </>
    )
}

