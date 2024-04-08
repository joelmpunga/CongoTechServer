import ArchDocComp from "./ArchDocComp";
import DragComponent from "./DragDrop/DragComponent";
import Title from "./Title";
import Inputs from "./Inputs";
import CbxInput from "./comboBox/CbxInput";
import axios from "axios";
import { useState,useEffect } from "react";


export default function ArchDocs() {
    const [descOwner, setDescOwner] = useState('')
    const [nameDoss, setNameDoss] = useState('')
    const [typeOwner,setTypeOwner] = useState('')
    const [owners, setOwners] = useState([])
    const [selectedOwner, setSelectedOwner] = useState('')
    const [nameDocs, setNameDocs] = useState('')
    const [docsDesc,setDocsDesc] = useState('')
    const [file,setFile] = useState([])
    const handleChangeType = (event) => {
        setTypeOwner(event.target.value)
    }
    const handleChangeDesc = (event) => {
        setDescOwner(event.target.value)
    }
    const handleChangeName = (event) => {
        setNameDoss(event.target.value)
    }
    const handleChangeSelectedOwner = (event) => {
        setSelectedOwner(event.target.value)
    }
    const handleChangeNameDocs = (event) => {
        setNameDocs(event.target.value)
    }
    const handleChangeDocDesc = (event) => {
        setDocsDesc(event.target.value)
    }

    const getAllOwners = async(event) => {
        await axios.get('http://localhost:3000/owner').then((res) =>{setOwners(res.data)})
    }

    console.log("le fichier",file);
    useEffect(() => {
        getAllOwners()
    },['owners'])
    console.log(owners);
    useEffect((event) => {
        handleChangeDesc
        handleChangeName
        handleChangeType
    },['typeOwner', 'nameDoss', 'descOwner'])
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/owner/create', {
            name: nameDocs,
            description: docsDesc,
            idOwner: selectedOwner
        }).then(res => {
            if (res.status === 200) {
                window.location.href = '/archive'
            }
        })
    }
    const handleSubmitDocument = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        axios.post('http://localhost:3000/file/upload', {
            description: descOwner,
            type: typeOwner,
            headers : {
                "Authorization": "Bearer " + token
            }
        }).then(res => {
            if (res.status === 200) {
                window.location.href = '/archive'
            }
        })
    }
    console.log(descOwner,nameDoss,typeOwner);
    return (
        <>
            {/* tilte, dragDrop, ownNametypeDoc, attName */}

            <div className="m-5 flex flex-row justify-between w-[1250px]">
                <h2>Archiver les documents</h2>
                <p>Dashboard / Archive</p>
            </div>
            <div className="flex">
                <div className="w-[650px]">
                    <ArchDocComp onSubmit={handleSubmitDocument} >
                        <Title title='Information du document' />
                            <CbxInput ownNametypeDoc='Nom du proprietaire' onChange={handleChangeType} >
                                <option value=""></option>
                                {
                                    owners.map(owner => (
                                        <option key={owner.id} value={owner.id}>{owner.nom}</option>
                                    ))
                                }
                            </CbxInput>
                        <DragComponent file={file}/>
                    </ArchDocComp>
                </div>
                <div className="w-[650px]">
                    <ArchDocComp ownNametypeDoc='Type du proprietaire' attName='Nom' onChange={handleChangeDesc} onSubmit={handleSubmit}>
                        <Title title='Ajouter un propriétaire' />
                        <Inputs attName='Nom à attribuer au document' onChange={handleChangeName}>
                            <CbxInput ownNametypeDoc='Type du proprietaire' onChange={handleChangeType}>
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

