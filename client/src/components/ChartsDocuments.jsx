import { useState, useEffect } from 'react'
import ChartsBar from './ChartsBar'
import ChartsCell from './ChartsCell'
import ChartsBarRadial from './ChartsBarRadial'
import ChartsArea from './ChartsArea'
import ChartsComposed from './ChartsComposed'
import ChartsLine from './ChartsLine'
import CardChart from '../ui/CardChart'
import axios from 'axios'

export default function ChartsDocuments() {
    const [allDocuments, setAllDocuments] = useState([])
    const [unClassedDocuments, setUnClassedDocument] = useState([])
    const [allUsers,setAllUsers] = useState([])
    const [usersSecretary,setUsersSecretary] = useState([])
    const [usersAdmin,setUsersAdmin] = useState([])
    const [owners,setOwners] = useState([])
    const [ownersParticulier,setOwnersParticulier] = useState([])
    const [ownersEntreprise,setOwnersEntreprise] = useState([])
    const getDocuments = async () => await axios.get("http://localhost:3000/charts/document").then(res => setAllDocuments(res.data))
    const getFiles = async () => await axios.get("http://localhost:3000/file/draft").then(res => setUnClassedDocument(res.data))
    const getUsers = async () => await axios.get("http://localhost:3000/charts/user").then(res => setAllUsers(res.data))
    const getUsersSecretary = async () => await axios.get("http://localhost:3000/charts/user/secretaire").then(res => setUsersSecretary(res.data))
    const getUsersAdmin = async () => await axios.get("http://localhost:3000/charts/user/admin").then(res => setUsersAdmin(res.data))
    const getOwners = async () => await axios.get("http://localhost:3000/owner").then(res => setOwners(res.data))
    const getOwnersParticulier = async () => await axios.get("http://localhost:3000/charts/owner/particulier").then(res => setOwnersParticulier(res.data))
    const getOwnersEntreprise = async () => await axios.get("http://localhost:3000/charts/owner/entreprise").then(res => setOwnersEntreprise(res.data))


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
    console.log(ownersEntreprise);

    return (
        <div className='flex gap-5 p-5 w-auto overflow-x-auto h-[760px]'>
            <div className='flex flex-col gap-10'>
                <div className='flex gap-4 justify-between'>
                    <CardChart title="DOCUMENTS" number={allDocuments.length} descriptions="documents" subStat={true} stat1={allDocuments.length - unClassedDocuments.length} titleStat1 = "Classé(s)" stat2={unClassedDocuments.length} titleStat2 = "Non Classé(s)"/>
                    <CardChart title="EMAILS" number={0} descriptions="emails" subStat={true} stat1={0} titleStat1 = "Classé(s)" stat2={0} titleStat2 = "Non Classé(s)"/>
                </div>
                <ChartsBar title="DOCUMENTS Vs EMAIL / Mois" />
                <ChartsArea title="DOCUMENTS Vs EMAIL / Années" />
            </div>
            <div className='flex flex-col gap-10'>
                <div className='flex gap-4 justify-between'>
                    <CardChart title="UTILISATEURS" number={allUsers.length} descriptions="utilisateurs" subStat={true} stat1={usersAdmin.length} titleStat1 = "Admin(s)" stat2={usersSecretary.length} titleStat2 = "Secretaire(s)" />
                    <CardChart title="CLIENTS" number={owners.length} descriptions="clients" subStat={true} stat1={ownersEntreprise.length} titleStat1 = "Entreprise(s)" stat2={ownersParticulier.length} titleStat2 = "Particulier(s)"/>
                </div>
                <ChartsBarRadial title="TYPE DE DOCUMENTS" />
                <ChartsLine title="PARTICULIERS VS ENTREPRISES" />
            </div>
        </div>
    )
}
