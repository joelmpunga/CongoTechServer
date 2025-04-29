import { useState, useEffect } from 'react'
import Mail from './Mail'
import File from '../ui/File'
import HeaderWorkspace from './HeaderWorkspace'
import ItemLinkPage from '../ui/ItemLinkPage'
import WorkSpace from './WorkSpace'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import NextBtn from './nextPrevBtns/NextBtn'
import PrevBtn from './nextPrevBtns/PrevBtn'
import { Link } from 'react-router-dom'
import { useMyContext } from '../contexts/MyContext'
import ActionBtns from './ActionBtns'
import ArchDocComp from "./archDoc/ArchDocComp";
import DragComponent from "./archDoc/DragDrop/DragComponent";
import Title from "./archDoc/Title";
import Inputs from "./archDoc/Inputs";
import CbxInput from "./archDoc/comboBox/CbxInput";
import PopupAlert from "../ui/Popup";
import Swal from "sweetalert2";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// taken from App Component

import SideBarAdmin from './SideBarAdmin'
import SideBarSecretaire from './SideBarSecretaire'
import Header from './Header'
// End taken from App Component
export default function StockageMailsDocuments() {
    const { idfile, handleCloseContextMenu, contextMenuVisible, contextMenuPosition } = useMyContext();

    const navigate = useNavigate()
    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated')
    if (!isAuthenticatedLocalStorage) {
        navigate('/login')
    }
    //taken from App Component

    const nom = localStorage.getItem('nom');
    const postnom = localStorage.getItem('postnom');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const [searchField, setSearchField] = useState("");
    const  [yearField, setYearField] = useState("");
    const  [typeDocField, setTypeDocField] = useState("");

    //end taken form App Component

    const handleBackClick2 = () => {
        navigate(-2);
    };

    const handleBackClick1 = () => {
        navigate(-1);
    };

    const params = useParams()
    const id = parseInt(params.id)
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentSubFolder, setCurrentSubFolder] = useState([])
    const [currentFolder, setCurrentFolder] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(12); // Nombre d'éléments à afficher par page
    // Fonction pour obtenir les éléments de la page actuelle
    const getCurrentPageData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredFiles.slice(startIndex, endIndex);
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

    // search filters
    const filteredFiles = files.filter(file =>
        (file.name.toLowerCase().includes(searchField.toLowerCase()) && file.type.toLowerCase().includes(typeDocField.toLowerCase()))
    );
    //end search filters

    const getFiles = async () => {
        try {
            const res = await axios.get("http://localhost:3000/file/" + id);
            setFiles(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch files:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            getFiles();
        }, 3000);
    }, [files]);

    const getCurrentSubFolder = async () => {
        try {
            const res = await axios.get("http://localhost:3000/subfolder/getbyid/" + id);
            setCurrentSubFolder(res.data);
        } catch (error) {
            console.error("Failed to fetch current subfolder:", error);
        }
    };

    useEffect(() => {
        getCurrentSubFolder();
    }, []);

    const getCurrentFolder = async () => {
        try {
            const res = await axios.get("http://localhost:3000/folder/" + currentSubFolder.idFolder);
            setCurrentFolder(res.data);
        } catch (error) {
            console.error("Failed to fetch current folder:", error);
        }
    };

    useEffect(() => {
        if (currentSubFolder && currentSubFolder.idFolder) {
            getCurrentFolder();
        }
    }, [currentSubFolder]);

    //for modal

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.modal-content') && isOpen) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    //const { isAuthenticated, updateIsAuthenticated } = useMyContext();
    const [ownerErr, setOwnerErr] = useState({ nameErr: '' })
    const [typeDocErr, setTypeDocErr] = useState({ typeDocErr: '' })
    const [yearErr, setYearErr] = useState({ debutErr: '', finErr: '' })
    const [docErr, setDocErr] = useState({ ownerErr: '', fileErr: '' })

    const [descOwner, setDescOwner] = useState('')
    const [nameOwner, setNameOwner] = useState('')
    const [typeOwner, setTypeOwner] = useState('')
    const [owners, setOwners] = useState([])
    const [years, setYears] = useState([])
    const [anneeEnCours, setAnneeEnCours] = useState()
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

    const getAllOwners = async (event) => {
        await axios.get('http://localhost:3000/owner').then((res) => { setOwners(res.data) })
    }
    const getAllYears = async (event) => {
        await axios.get('http://localhost:3000/years').then((res) => { 
            setYears(res.data)
            const activeYear = res.data.find(year => year.isEnCours==1);         
            if (activeYear) {
                setAnneeEnCours(activeYear.id);
            }
        })
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
        handleChangeType
    }, ['typeOwner', 'nameOwner', 'descOwner'])



    const validateOwner = () => {
        let errors = {};
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (typeOwner == '') {
            errors.typeErr = 'Selectionner le type';
        }

        if (!nameOwner.match(nameRegex)) {
            errors.nameErr = 'Nom invalid';
        }

        setOwnerErr(errors);

        return Object.keys(errors).length === 0;
    };


    const validateDoc = () => {

        let errors = {};
        if (selectedOwner == '') {
            errors.ownerErr = 'Selectionner le type';
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
            timer: 3000
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
                formData.append('idSubFolder', parseInt(id));

                await axios.post('http://localhost:3000/file/upload', formData).then(res => {
                    if (res.status === 201) {
                        // navigate('/file/' + id)
                        // window.location.href = '/file/' + id
                        TopNotification.fire({
                            icon: "success",
                            title: "Le fichier est archivée, veuillez annuler la fenetre"
                        });
                    }
                    else if (res.status === 404) {
                        showAlert(
                            "warning",
                            "Erreur",
                            `Fichier Existant, choisir un autre fichier à archiver ${res.data.message}`
                        );
                    }
                }).catch((err) => {
                    // setErrorDoc(true)
                    // setErrorMessageDoc(err.response.data)
                    // TopNotification.fire({
                    //     icon: "warning",
                    //     title: "Fichier Existant"
                    // });
                    // window.location.href = '/file/' + id
                    showAlert(
                        "warning",
                        "Erreur",
                        "Fichier Existant"
                    );
                    // navigate('/file/' + id)
                }
                )
            } catch (error) {
                showAlert(
                    "warning",
                    "Erreur",
                    `Erreur lors du téléchargement du fichier ${error}`
                );
                window.location.href = '/file/' + id
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
                    <Header hasSearch={true} email={email} name={nom + " " + postnom} title={role} setSearchField={setSearchField} hasYear={true} hasTypeDoc={true} setYearField={setYearField} setTypeDocField={setTypeDocField} />
                    <div className='flex flex-col gap-10 mx-3' >
                        <div className=''>
                            <HeaderWorkspace title="Documents" actualPage={currentSubFolder.titre} >
                                <Link to="/charts/doc" >
                                    <ItemLinkPage title="Dashboard" path="/charts/doc" />
                                </Link>
                                <Link to="#" onClick={handleBackClick1} >
                                    <ItemLinkPage title={"/ " + currentFolder.titre} />
                                </Link>
                            </HeaderWorkspace>
                        </div>
                        <div className='bg-white shadow-2xl h-[700px] rounded-lg'>

                            <WorkSpace message="Parcourez les fichiers">
                                <div className='flex flex-wrap w-[100%] overflow-flex-auto h-[580px]'>
                                    {/* Modal */}
                                    {isOpen && (
                                        <div className='absolute bg-[#70726e7c] flex flex-row inset-0 justify-center items-center'>
                                            <div className="bg-gray-100 shadow-2xl p-4 w-[35%] modal-content" onClick={handleBackgroundClick}>
                                                <button className="text-[30px]" onClick={closeModal}>&times;</button>
                                                <div className="font-adamina text-[14px] flex w-full justify-end mx-auto mt-10">
                                                    <div className="w-[650px] border border-gray-200 shadow-md">

                                                        <form action="" encType="multipart/form-data">
                                                            {
                                                                errorDoc && <PopupAlert message={errorMessageDoc} />
                                                            }
                                                            <ArchDocComp onChange={handleChangeDocDesc} onSubmit={handleSubmitDocument}
                                                                className=" bg-gray-200 resize-none p-5 w-full h-[120px] my-5 border-1  border-blue outline-none"
                                                            >
                                                                <CbxInput msgErr={docErr.ownerErr} ownNametypeDoc='Nom du service' onChange={handleChangeSelectedOwner} className='w-full h-14' >
                                                                    <option value=""></option>
                                                                    {
                                                                        owners.map(owner => (
                                                                            <option key={owner.id} value={owner.id}>{owner.nom}</option>
                                                                        ))
                                                                    }
                                                                </CbxInput>
                                                                <CbxInput msgErr={docErr.ownerErr} ownNametypeDoc='Entrant / Sortant' onChange={handleChangeSelectedTypeDoc} className='w-full h-14' >
                                                                    <option value=""></option>
                                                                    <option value="Entrant">Entrant</option>
                                                                    <option value="Sortant">Sortant</option>
                                                                </CbxInput>
                                                                <CbxInput msgErr={docErr.ownerErr} ownNametypeDoc='Année du document' onChange={handleChangeSelectedYear} className='w-full h-14' value={anneeEnCours}>
                                                                    <option value="">Rien</option>
                                                                    {
                                                                        years.map(year => (
                                                                            <option key={year.id} value={year.id}>{year.debut.split('-')[0]} - {year.fin.split('-')[0]}</option>
                                                                        ))
                                                                    }
                                                                </CbxInput>
                                                                <DragComponent errMsg={docErr.fileErr} getFile={handleChangeFileDocs} />
                                                            </ArchDocComp>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )}
                                    {/* End modal */}
                                    {contextMenuVisible && (
                                        <div
                                            className="fixed bg-white border rounded shadow p-2"
                                            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
                                            onClick={handleCloseContextMenu}
                                        >
                                            <div className='flex flex-col'>
                                                <Link to={`http://localhost:3000/file/show/${idfile}`}>
                                                    <span className="flex gap-4 py-1 px-1 hover:bg-gray-100 cursor-pointer"><img src="../src/assets/images/eye.svg" alt="" /> Ouvrir</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                    {/* {isVisible && (
                        <div
                            className="absolute bg-white border border-gray-300 p-2 shadow-md"
                            style={{ left: position.x, top: position.y }}
                        >
                            <ul>
                                <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Ouvrir</li>
                                <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Renomer</li>
                                <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Supprimer</li>
                                <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Télécharger</li>
                                <li className="cursor-pointer py-2 px-4 hover:bg-gray-100" >Détails du Fichier</li>
                            </ul>
                        </div>
                    )} */}

                                    {
                                        loading ? (
                                            <>
                                                <div className="flex gap-4 px-6 py-4">
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                </div>
                                                <div className="flex gap-4 px-6 py-4">
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                    <Skeleton height={200} width={200} borderRadius={20} />
                                                </div>
                                            </>
                                        ) :
                                            filteredFiles.length === 0 ? (
                                                <div className="px-80 py-20">
                                                    <img src="../src/assets/images/search-files-empty.png" className='w-80 h-80' alt="" />
                                                    <h1 className='text-gray-700 text-[20px]'>Aucune donnée trouvée!</h1>
                                                </div>
                                            ) : (
                                                getCurrentPageData().map(file => (
                                                    <tr key={file.id}>
                                                        <File data={file} id={file.id} menuContex={true} title={file.name} />
                                                    </tr>
                                                ))
                                            )
                                    }
                                </div>
                                {/* <Mail title="Mail" data={data} />
                <File title="File.png" />
                <Mail title="Mail" data={data} />
                <File title="File.png" />
                <Mail title="Mail" data={data} />
                <File title="File.png" />*/}
                                <div className='flex justify-between w-full mx-5'>
                                    <ReactPaginate
                                        previousLabel={"Précédent"}
                                        nextLabel={"Suivant"}
                                        breakLabel={"..."}
                                        pageCount={Math.ceil(filteredFiles.length / itemsPerPage)} // Calcul du nombre total de pages
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={"flex justify-end gap-6 text-[20px]"}
                                        activeClassName={"active"}
                                    />
                                    <div>
                                        <button
                                            className='flex flex-row gap-3 justify-center items-center bg-blue-600 rounded-2xl w-[150px] h-[50px] text-white'
                                            onClick={openModal}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="white" d="m12 18l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14zM5 8v11h14V8zm0 13q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25zm6.6 7.5" /></svg>
                                            <span>Archiver</span>
                                        </button>
                                    </div>
                                </div>
                            </WorkSpace>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
