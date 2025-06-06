import { useState, useEffect } from 'react'
import ChartsBar from './ChartsBar'
import ChartsCell from './ChartsCell'
import ChartsBarRadial from './ChartsBarRadial'
import ChartsArea from './ChartsArea'
import ChartsComposed from './ChartsComposed'
import ChartsLine from './ChartsLine'
import CardChart from '../ui/CardChart'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// taken from App Component

import SideBarAdmin from './SideBarAdmin'
import SideBarSecretaire from './SideBarSecretaire'
import Header from './Header'
// End taken from App Component

export default function ChartsDocuments() {
    const [allDocuments, setAllDocuments] = useState([])
    const [unClassedDocuments, setUnClassedDocument] = useState([])
    const [entrantDocuments, setEntrantDocument] = useState([])
    const [sortantDocuments, setSortantDocument] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [usersSecretary, setUsersSecretary] = useState([])
    const [usersAdmin, setUsersAdmin] = useState([])
    const [owners, setOwners] = useState([])
    const [ownersParticulier, setOwnersParticulier] = useState([])
    const [ownersEntreprise, setOwnersEntreprise] = useState([])
    const getDocuments = async () => await axios.get("http://localhost:3000/charts/document").then(res => setAllDocuments(res.data))
    const getFiles = async () => await axios.get("http://localhost:3000/file/draft").then(res => setUnClassedDocument(res.data))
    const getFiltresEntrant = allDocuments.filter(file =>
        (file.type.includes('Entrant'))
    );
    const getFiltresSortant = allDocuments.filter(file =>
        (file.type.includes('Sortant'))
    );
    const getFilesEntrant = () => {
        setEntrantDocument(getFiltresEntrant)
        setSortantDocument(getFiltresSortant)
    }
    const getUsers = async () => await axios.get("http://localhost:3000/charts/user").then(res => setAllUsers(res.data))
    const getUsersSecretary = async () => await axios.get("http://localhost:3000/charts/user/secretaire").then(res => setUsersSecretary(res.data))
    const getUsersAdmin = async () => await axios.get("http://localhost:3000/charts/user/admin").then(res => setUsersAdmin(res.data))
    const getOwners = async () => await axios.get("http://localhost:3000/owner").then(res => setOwners(res.data))
    const getOwnersParticulier = async () => await axios.get("http://localhost:3000/charts/owner/particulier").then(res => setOwnersParticulier(res.data))
    const getOwnersEntreprise = async () => await axios.get("http://localhost:3000/charts/owner/entreprise").then(res => setOwnersEntreprise(res.data))

    const isAuthenticatedLocalStorage = localStorage.getItem('isAuthenticated');
    const navigate = useNavigate();
    if (!isAuthenticatedLocalStorage) {
        navigate('/login');
    }
    //taken from App Component

    const nom = localStorage.getItem('nom');
    const postnom = localStorage.getItem('postnom');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const [searchField, setSearchField] = useState("");

    //end taken form App Component

    useEffect(() => {
        getDocuments()
        getFiles()
        getUsers()
        getUsersAdmin()
        getUsersSecretary()
        getOwners()
        getOwnersParticulier()
        getOwnersEntreprise()
    }, [])
    useEffect(() => {
        getFilesEntrant()
    }, [allDocuments])

    return (
        <>
            <div className='flex gap-0 w-full fixed'>
                {
                    role === 'ADMIN' ? <SideBarAdmin /> : <SideBarSecretaire />
                }
                <div className='flex flex-col w-full bg-slate-200'>
                    <Header hasSearch={false} email={email} name={nom + " " + postnom} title={role} setSearchField={setSearchField} />
                    <div className='flex gap-5 p-5 w-auto overflow-x-auto h-[860px]'>
                        <div className='flex flex-col gap-10'>
                            <div className='flex gap-4 justify-between'>
                                <CardChart title="TOUS LES DOCUMENTS" number={allDocuments.length} descriptions="documents" subStat={true} stat1={allDocuments.length - unClassedDocuments.length} titleStat1="Classé(s)" stat2={unClassedDocuments.length} titleStat2="Non Classé(s)" />
                                <CardChart title="ENTRANTS & SORTANTS" number={allDocuments.length} descriptions="documents" subStat={true} stat1={sortantDocuments.length} titleStat1="Sortant(s)" stat2={entrantDocuments.length} titleStat2="Entrant(s)" />
                            </div>
                            <ChartsBar title="ENTRANTS & SORTANTS" />
                        </div>
                        <div className='flex flex-col gap-10'>
                            <div className='flex gap-4 justify-between'>
                                <CardChart title="UTILISATEURS" number={allUsers.length} descriptions="utilisateurs" subStat={true} stat1={usersAdmin.length} titleStat1="Admin(s)" stat2={usersSecretary.length} titleStat2="Secretaire(s)" />
                                <CardChart title="SERVICES" number={owners.length} descriptions="services" subStat={true} stat1={ownersEntreprise.length} titleStat1="Actif(s)" stat2={0} titleStat2="Inactif(s)" />
                            </div>
                            <ChartsArea title="ENTRANTS & SORTANTS" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
