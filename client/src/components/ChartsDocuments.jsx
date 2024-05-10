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
    const [unClassedDocuments,setUnClassedDocument] = useState([])
    const getDocuments = async () => await axios.get("http://localhost:3000/charts").then(res => setAllDocuments(res.data))
    const getFiles = async () => await axios.get("http://localhost:3000/file/draft").then(res => setUnClassedDocument(res.data))
    useEffect(() => {
        getDocuments()
        getFiles()
     }, [])
    console.log(unClassedDocuments);
    return (
        <div className='flex gap-5 p-5 w-auto overflow-x-auto h-[760px]'>
            <div className='flex flex-col gap-10'>
                <CardChart title="DOCUMENTS" number={allDocuments.length} descriptions="documents" />
                <ChartsBar title="DOCUMENTS Vs EMAIL / Mois" />
                <ChartsCell title="Classé Vs Non Classé" active={allDocuments.length - unClassedDocuments.length} inactive = {unClassedDocuments.length} />
                <ChartsComposed title="DOCUMENTS / Mois" />
            </div>
            <div className='flex flex-col gap-10'>
                <CardChart title="EMAILS" number={0} descriptions="emails" />
                <ChartsBarRadial title="TYPE DE DOCUMENTS" />
                <ChartsArea title="DOCUMENTS Vs EMAIL / Années" />
                <ChartsLine title="PARTICULIERS VS ENTREPRISES" />
            </div>
        </div>
    )
}
