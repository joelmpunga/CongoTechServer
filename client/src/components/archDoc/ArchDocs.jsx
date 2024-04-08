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
    const handleChangeType = (event) => {
        setTypeOwner(event.target.value)
    }
    const handleChangeDesc = (event) => {
        setDescOwner(event.target.value)
    }
    const handleChangeName = (event) => {
        setNameDoss(event.target.value)
    }
    useEffect((event) => {
        handleChangeDesc
        handleChangeName
        handleChangeType
    },['typeOwner', 'nameDoss', 'descOwner'])
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/owner/create', {
            nom: nameDoss,
            description: descOwner,
            type: typeOwner
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
                    <ArchDocComp   >
                        <Title title='Information du document' />
                        <Inputs attName='Nom à attribuer au document' >
                            <CbxInput ownNametypeDoc='Nom du proprietaire' >
                                <option value=""></option>
                                <option value="">Entreprise</option>
                                <option value="">Particulier</option>
                            </CbxInput>
                        </Inputs>
                        <DragComponent />
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

