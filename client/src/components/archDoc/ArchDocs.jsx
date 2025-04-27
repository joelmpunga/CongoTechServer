import ArchDocComp from "./ArchDocComp";
import DragComponent from "./DragDrop/DragComponent";
import Title from "./Title";
import Inputs from "./Inputs";
import CbxInput from "./comboBox/CbxInput";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../../contexts/MyContext";
import PopupAlert from "../../ui/Popup";
import HeaderWorkspace from "../HeaderWorkspace";
import ItemLinkPage from "../../ui/ItemLinkPage";
import Swal from "sweetalert2";

// taken from App Component

import SideBarAdmin from "../SideBarAdmin";
import SideBarSecretaire from "../SideBarSecretaire";
import Header from "../Header";
// End taken from App Component

export default function ArchDocs() {

    const navigate = useNavigate();

    //const { isAuthenticated, updateIsAuthenticated } = useMyContext();
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }

    //stolen from App Component

    const nom = localStorage.getItem('nom');
    const postnom = localStorage.getItem('postnom');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const [searchField, setSearchField] = useState("");

    //end stolen form App Component
    const [ownerErr, setOwnerErr] = useState({ nameErr: '' })
    const [typeDocErr, setTypeDocErr] = useState({ typeDocErr: '' })
    const [yearErr, setYearErr] = useState({ debutErr: '', finErr: '' })
    const [docErr, setDocErr] = useState({ ownerErr: '', fileErr: '' })

    const [descOwner, setDescOwner] = useState('')
    const [nameOwner, setNameOwner] = useState('')
    const [nameTypeDoc, setNameTypeDoc] = useState('')
    const [debut, setDebut] = useState('')
    const [fin, setFin] = useState('')
    const [owners, setOwners] = useState([])
    const [years, setYears] = useState([])
    const [selectedOwner, setSelectedOwner] = useState('')
    const [selectedTypeDoc, setSelectedTypeDoc] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    const [nameDocs, setNameDocs] = useState('')
    const [docsDesc, setDocsDesc] = useState('')
    const [file, setFile] = useState([])
    const [filesInput, setFilesInput] = useState([])
    const [errorOwner, setErrorOwner] = useState(false)
    const [errorYear, setErrorYear] = useState(false)
    const [errorMessageOwner, setErrorMessageOwner] = useState('')
    const [errorMessageYear, setErrorMessageYear] = useState('')
    const [errorDoc, setErrorDoc] = useState(false)
    const [errorMessageDoc, setErrorMessageDoc] = useState('')

    const handleChangeDesc = (event) => {
        setDescOwner(event.target.value)
    }
    const handleChangeName = (event) => {
        setNameOwner(event.target.value)
    }
    const handleChangeSelectedOwner = (event) => {
        setSelectedOwner(event.target.value)
    }
    const handleChangeSelectedTypeDoc = (event) => {
        setSelectedTypeDoc(event.target.value)
    }
    const handleChangeSelectedYear = (event) => {
        setSelectedYear(event.target.value)
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
    const handleChangeDebut = (event) => {
        setDebut(event.target.value)
    }
    const handleChangeFin = (event) => {
        setFin(event.target.value)
    }

    const getAllOwners = async (event) => {
        await axios.get('http://localhost:3000/owner').then((res) => { setOwners(res.data) })
    }
    const getAllYears = async (event) => {
        await axios.get('http://localhost:3000/years').then((res) => { setYears(res.data) })
    }
    useEffect(() => {
        getAllOwners()
    }, ['owners'])
    useEffect(() => {
        getAllYears()
    }, ['years'])
    useEffect((event) => {
        handleChangeDesc
        handleChangeName
    }, ['nameOwner', 'descOwner'])

    useEffect((event) => {
        handleChangeDebut
        handleChangeFin
    }, ['debut', 'fin'])


    const validateOwner = () => {
        let errors = {};
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (!nameOwner.match(nameRegex)) {
            errors.nameErr = 'Nom invalid';
        }

        setOwnerErr(errors);

        return Object.keys(errors).length === 0;
    };

    const validateTypeDoc = () => {
        let errors = {};
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (!nameTypeDoc.match(nameRegex)) {
            errors.nameErr = 'Nom invalid';
        }

        setTypeDocErr(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmitOwner = (event) => {
        try {
            event.preventDefault()
            const isValid = validateOwner();
            if (isValid) {

                axios.post('http://localhost:3000/owner/create', {
                    description: descOwner,
                    nom: nameOwner,
                }).then(res => {
                    if (res.status === 200) {
                        window.location.href = '/archive'
                    }
                }).catch(err => {
                    setErrorOwner(true)
                    setErrorMessageOwner(err.response.data)
                })

            } else {
                console.log('error:'.isValid)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSubmitYear = (event) => {
        try {
            event.preventDefault()
                axios.post('http://localhost:3000/years/create', {
                    debut: debut,
                    fin: fin
                }).then(res => {
                    if (res.status === 200) {
                        window.location.href = '/archive'
                    }
                }).catch(err => {
                    setErrorYear(true)
                    setErrorMessageYear(err.response.data)
                })}
                catch (err) {
                    console.log(err);
                }
        }

    const validateDoc = () => {

        let errors = {};
        if (selectedOwner == '') {
            errors.ownerErr = 'Selectionner le partenaire';
        }
        if (selectedTypeDoc == '') {
            errors.ownerErr = 'Selectionner le type';
        }

        if (file.length === 0) {
            errors.fileErr = 'Selectionner un document';
        }

        setDocErr(errors);

        return Object.keys(errors).length === 0;
    };


    const TopNotification = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,

    });

    function showAlert(icon, title, text) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: false,
            width: 500,
            timer: 6000
        });
    }


    const handleSubmitDocument = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        const isValid = validateDoc()

        if (isValid) {
            try {
                const userId = localStorage.getItem('userId')
                const formData = new FormData();
                formData.append('file', file);
                formData.append('idOwner', parseInt(selectedOwner));
                formData.append('description', docsDesc);
                formData.append('typeDoc', selectedTypeDoc)
                formData.append('idUser', userId);
                formData.append('idYear', selectedYear)
                await axios.post('http://localhost:3000/file/upload', formData).then(res => {
                    if (res.status === 201) {
                        navigate('/archive')
                        window.location.href = '/archive'
                        TopNotification.fire({
                            icon: "success",
                            title: "Le fichier est archivée"
                        });
                    }
                    if (res.status === 404) {
                        TopNotification.fire({
                            icon: "Echec",
                            title: "Le fichier semble deja existants, veuillez renommer le fichier et reessayez!"
                        });
                    }
                }).catch((err) => {
                    showAlert(
                        "warning",
                        "Erreur",
                        "Fichier Existant"
                    );
                    showAlert(
                        "warning",
                        "Erreur",
                        `Une Erreur lors du téléchargement du fichier. Le fichier semble deja existants, veuillez renommer le fichier et reessayez! `
                    );
                })
            } catch (error) {
                console.error('Erreur lors du téléchargement du fichier :', error);
                showAlert(
                    "warning",
                    "Erreur",
                    `Erreur lors du téléchargement du fichier ${error}`
                );
            }
        }



    }



    return (
        <>
            <div className='flex gap-0 w-full fixed'>
                {
                    role === 'ADMIN' ? <SideBarAdmin /> : <SideBarSecretaire />
                }
                <div className='flex flex-col w-full bg-slate-200'>
                    <Header hasSearch={false} email={email} name={nom + " " + postnom} title={role} setSearchField={setSearchField} />
                    <div className='flex flex-col gap-10 mx-3' >
                        <div className=''>
                            <HeaderWorkspace title="Archiver les documents" actualPage="Archiver les documents">
                                <Link to="/charts/doc" >
                                    <ItemLinkPage title="Dashboard" path="/charts/doc" />
                                </Link>
                            </HeaderWorkspace>
                        </div>
                        <div className='bg-white shadow-2xl h-[900px] rounded-lg'>

                            <div className="font-adamina text-[14px] overflow-x-auto flex gap-16 w-full justify-center mx-auto mt-10">
                                <div className="w-[660px] border border-gray-200 shadow-md">
                                    <form action="" encType="multipart/form-data">
                                        <Title title='Information du document' />
                                        {
                                            errorDoc && <PopupAlert message={errorMessageDoc} />
                                        }
                                        <ArchDocComp onChange={handleChangeDocDesc} onSubmit={handleSubmitDocument}
                                            className=" bg-gray-200 resize-none p-5 w-full h-[120px] my-5 border-1  border-blue outline-none"
                                        >
                                            <CbxInput msgErr={docErr.ownerErr} ownNametypeDoc='Destination/Provenance' onChange={handleChangeSelectedOwner} className='w-full h-14' >
                                                <option value=""></option>
                                                {
                                                    owners.map(owner => (
                                                        <option key={owner.id} value={owner.id}>{owner.nom}</option>
                                                    ))
                                                }
                                            </CbxInput>
                                            <CbxInput msgErr={docErr.ownerErr} ownNametypeDoc='Type du document' onChange={handleChangeSelectedTypeDoc} className='w-full h-14' >
                                                <option value=""></option>
                                                <option value="Entrant">Entrant</option>
                                                <option value="Sortant">Sortant</option>
                                            </CbxInput>
                                            <CbxInput msgErr={docErr.ownerErr} ownNametypeDoc='Année du document' onChange={handleChangeSelectedYear} className='w-full h-14' >
                                                <option value="">Pas d'année liée</option>
                                                {
                                                    years.map(year => (
                                                        <option key={year.id} value={year.id}>De {year.debut.split('T')[0]} à {year.fin.split('T')[0]}</option>
                                                    ))
                                                }
                                            </CbxInput>
                                            <br />
                                            <DragComponent errMsg={docErr.fileErr} getFile={handleChangeFileDocs} />
                                        </ArchDocComp>
                                    </form>
                                </div>
                                <div className="w-[650px] border border-gray-200 shadow-md">
                                    <Title title='Ajouter un partenaire' />
                                    {
                                        errorOwner && <PopupAlert message={errorMessageOwner} />
                                    }
                                    <ArchDocComp ownNametypeDoc='Type du partenaire' attName='Nom' onChange={handleChangeDesc} onSubmit={handleSubmitOwner}
                                        className=" bg-gray-200 resize-none p-5 w-full h-42 my-5 border-1  border-blue outline-none"
                                    >
                                        <Inputs errMsg={ownerErr.nameErr} attName='Nom du partenaire' onChange={handleChangeName} placeholder='Exemple IGE'>
                                        </Inputs>
                                    </ArchDocComp>
                                </div>
                                <div className="w-[650px] border border-gray-200 shadow-md">
                                    <Title title='Ajouter une année scolaire' />
                                    {
                                        errorYear && <PopupAlert message={errorMessageYear} />
                                    }
                                    <ArchDocComp ownNametypeDoc='debut' attName='Debut' onSubmit={handleSubmitYear}
                                        className=" bg-gray-200 resize-none p-5 w-full h-42 my-5 border-1  border-blue outline-none" description={false}
                                    >
                                        <Inputs errMsg={yearErr.debutErr} attName='Date Fin' onChange={handleChangeDebut} placeholder='Date Fin' type="date">
                                        </Inputs>
                                        <Inputs errMsg={yearErr.finErr} attName='Date Fin' onChange={handleChangeFin} placeholder='Date Fin' type="date">
                                        </Inputs>
                                        <br />
                                    </ArchDocComp>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

