import ArchDocComp from "./archDoc/ArchDocComp";
import Title from "./archDoc/Title";
import Inputs from "./archDoc/Inputs";
import CbxInput from "./archDoc/comboBox/CbxInput";
import { useState, useEffect } from "react";
import axios from "axios";
import SaveCancelBtns from "./archDoc/SaveCancelBtns";


export default function CreatFolder() {
    const [descFold, setDescFold] = useState('')
    const [subDescFold, setDescSubFold] = useState('')
    const [nomFold, setNomFold] = useState('')
    const [nomFold, setNomFold] = useState('')
    const [folders,setFolders] = useState([])
    const handleChangeDescriptionFolder = (event) => {
        setDescFold(event.target.value)
    }
    const handleChangeDescriptionSubFolder = (event) => {
        setDescSubFold(event.target.value)
    }
    const handleChangeNomFolder = (event) => {
        setNomFold(event.target.value)
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
        })
    }
    useEffect(() => {
        handleChangeDescriptionFolder
        handleChangeNomFolder
        handleSubmitFolder
        

    },['descFold','nomFold'])

    useEffect(()=>{
        getAllFolders()
    },['folders'])

    console.log(folders);
    return (
        <>
            <div className="m-5 flex flex-row justify-between w-[1250px]">
                <h2 className="">Créer un dossier et un sous-dossier</h2>
                <p>Dashboard / dossier</p>
            </div>
            <div className="flex">
                <div className="w-[650px]">
                    <ArchDocComp   >
                        <Title title='Création d’un sous dossier' />
                        <Inputs attName='Nom du sous dossier' >
                            <CbxInput ownNametypeDoc='Nom du dossier parent'>
                                <option value=""></option>
                                {
                                    folders.map(folder => (
                                        <option key={folder.id} value={folder.id}>{folder.titre}</option>
                                    ))
                                }
                            </CbxInput>
                        </Inputs>
                    </ArchDocComp>
                </div>
                <div className="w-[650px]">
                    <ArchDocComp ownNametypeDoc='Type du proprietaire' attName='Nom' onChange={handleChangeDescriptionFolder} onSubmit = {handleSubmitFolder}>
                        <Title title='Ajouter un propriétaire' />
                        <Inputs attName='Nom du dossier ' onChange={handleChangeNomFolder} />
                    </ArchDocComp>
                </div>
            </div>
        </>
    )

}