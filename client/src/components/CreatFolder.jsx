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
    const [nomSubFold, setNomSubFold] = useState('')
    const [folders, setFolders] = useState([])
    const [parentFolder, setParentFolder] = useState('')
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
    const handleChangeParentSubFolder = (event) => {
        setParentFolder(event.target.value)
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


    console.log(subDescFold, nomSubFold, parentFolder);
    return (
        <>
            <div className="m-5 flex flex-row justify-between w-creen">
                <h2 className="">Créer un dossier et un sous-dossier</h2>
                <p>Dashboard / dossier</p>
            </div>

            <div className="flex ">

                <div className="flex gap-10 w-full justify-center items-center">
                    <div className="w-[650px] border border-gray-200 shadow-md">
                        <Title title='Création d’un sous dossier' />

                        <ArchDocComp onChange={handleChangeDescriptionSubFolder} onSubmit={handleSubmitSubFolder}
                          className=" bg-gray-200 resize-none p-5 w-full h-42 my-5 border-1  border-blue outline-none"
                        >
                            <Inputs attName='Nom du sous dossier' onChange={handleChangeNomSubFolder}>
                                <CbxInput ownNametypeDoc='Nom du dossier parent' onChange={handleChangeParentSubFolder} className='w-[300px] h-14'>
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
                    <div className="w-[650px] border border-gray-200 shadow-md">
                        <Title title='Ajouter un propriétaire' />
                        <ArchDocComp ownNametypeDoc='Type du proprietaire' attName='Nom' onChange={handleChangeDescriptionFolder} onSubmit={handleSubmitFolder}
                        className=" bg-gray-200 resize-none p-5 w-full h-42 my-5 border-1  border-blue outline-none"
                        >
                            <Inputs attName='Nom du dossier ' onChange={handleChangeNomFolder} />
                        </ArchDocComp>
                    </div>
                </div>
            </div>
        </>
    )

}