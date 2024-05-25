import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, } from 'recharts'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function ChartsLine({ title }) {
    const [janvPart, setJanvPart] = useState([])
    const [fevrPart, setFevrPart] = useState([])
    const [marsPart, setMarsPart] = useState([])
    const [avrilPart, setAvrilPart] = useState([])
    const [maiPart, setMaiPart] = useState([])
    const [juinPart, setJuinPart] = useState([])
    const [juilletPart, setJuilletPart] = useState([])
    const [aoutPart, setAoutPart] = useState([])
    const [septPart, setSeptPart] = useState([])
    const [octPart, setOctPart] = useState([])
    const [novPart, setNovPart] = useState([])
    const [decPart, setDecPart] = useState([])

    const [janvEntr, setJanvEntr] = useState([])
    const [fevrEntr, setFevrEntr] = useState([])
    const [marsEntr, setMarsEntr] = useState([])
    const [avrilEntr, setAvrilEntr] = useState([])
    const [maiEntr, setMaiEntr] = useState([])
    const [juinEntr, setJuinEntr] = useState([])
    const [juilletEntr, setJuilletEntr] = useState([])
    const [aoutEntr, setAoutEntr] = useState([])
    const [septEntr, setSeptEntr] = useState([])
    const [octEntr, setOctEntr] = useState([])
    const [novEntr, setNovEntr] = useState([])
    const [decEntr, setDecEntr] = useState([])


    const getNumberJanvPart = async () => await axios.get("http://localhost:3000/charts/owner/particulier/month/01").then(res => setJanvPart(res.data))
    const getNumberFevrPart = async () => await axios.get("http://localhost:3000/charts/owner/particulier/month/02").then(res => setFevrPart(res.data))
    const getNumberMarsPart = async () => await axios.get("http://localhost:3000/charts/owner/particulier/month/03").then(res => setMarsPart(res.data))
    const getNumberAvrilPart = async () => await axios.get("http://localhost:3000/charts/owner/particulier/month/04").then(res => setAvrilPart(res.data))
    const getNumberMaiPart = async () => await axios.get("http://localhost:3000/charts/owner/particulier/month/05").then(res => setMaiPart(res.data))
    const getNumberJuinPart = async () => await axios.get("http://localhost:3000/charts/owner/particulier/month/06").then(res => setJuinPart(res.data))
    const getNumberJuilletPart = async () => await axios.get("http://localhost:3000/charts/owner/particulier/month/07").then(res => setJuilletPart(res.data))
    const getNumberAoutPart = async () => await axios.get("http://localhost:3000/charts/owner/particulier/month/08").then(res => setAoutPart(res.data))
    const getNumberSeptPart = async () => await axios.get("http://localhost:3000/charts/owner/particulier/month/09").then(res => setSeptPart(res.data))
    const getNumberOctPart = async () => await axios.get("http://localhost:3000/charts/owner/particulier/month/10").then(res => setOctPart(res.data))
    const getNumberNovPart = async () => await axios.get("http://localhost:3000/charts/owner/particulier/month/11").then(res => setNovPart(res.data))
    const getNumberDecPart = async () => await axios.get("http://localhost:3000/charts/owner/particulier/month/12").then(res => setDecPart(res.data))

    const getNumberJanvEntr = async () => await axios.get("http://localhost:3000/charts/owner/entreprise/month/01").then(res => setJanvEntr(res.data))
    const getNumberFevrEntr = async () => await axios.get("http://localhost:3000/charts/owner/entreprise/month/02").then(res => setFevrEntr(res.data))
    const getNumberMarsEntr = async () => await axios.get("http://localhost:3000/charts/owner/entreprise/month/03").then(res => setMarsEntr(res.data))
    const getNumberAvrilEntr = async () => await axios.get("http://localhost:3000/charts/owner/entreprise/month/04").then(res => setAvrilEntr(res.data))
    const getNumberMaiEntr = async () => await axios.get("http://localhost:3000/charts/owner/entreprise/month/05").then(res => setMaiEntr(res.data))
    const getNumberJuinEntr = async () => await axios.get("http://localhost:3000/charts/owner/entreprise/month/06").then(res => setJuinEntr(res.data))
    const getNumberJuilletEntr = async () => await axios.get("http://localhost:3000/charts/owner/entreprise/month/07").then(res => setJuilletEntr(res.data))
    const getNumberAoutEntr = async () => await axios.get("http://localhost:3000/charts/owner/entreprise/month/08").then(res => setAoutEntr(res.data))
    const getNumberSeptEntr = async () => await axios.get("http://localhost:3000/charts/owner/entreprise/month/09").then(res => setSeptEntr(res.data))
    const getNumberOctEntr = async () => await axios.get("http://localhost:3000/charts/owner/entreprise/month/10").then(res => setOctEntr(res.data))
    const getNumberNovEntr = async () => await axios.get("http://localhost:3000/charts/owner/entreprise/month/11").then(res => setNovEntr(res.data))
    const getNumberDecEntr = async () => await axios.get("http://localhost:3000/charts/owner/entreprise/month/12").then(res => setDecEntr(res.data))


    useEffect(() => {
        getNumberJanvPart();
        getNumberFevrPart();
        getNumberMarsPart();
        getNumberAvrilPart();
        getNumberMaiPart();
        getNumberJuinPart();
        getNumberJuilletPart();
        getNumberAoutPart();
        getNumberSeptPart();
        getNumberOctPart();
        getNumberNovPart();
        getNumberDecPart();
    }, [])

    useEffect(() => {
        getNumberJanvEntr();
        getNumberFevrEntr();
        getNumberMarsEntr();
        getNumberAvrilEntr();
        getNumberMaiEntr();
        getNumberJuinEntr();
        getNumberJuilletEntr();
        getNumberAoutEntr();
        getNumberSeptEntr();
        getNumberOctEntr();
        getNumberNovEntr();
        getNumberDecEntr();
    })
    const data = [
        {
            "name": "Janv.",
            "entreprise": janvEntr.length,
            "particulier": janvPart.length,
            "amt": 2400
        },
        {
            "name": "Fevr.",
            "entreprise": fevrEntr.length,
            "particulier": fevrPart.length,
            "amt": 2210
        },
        {
            "name": "Mars",
            "entreprise": marsEntr.length,
            "particulier": marsPart.length,
            "amt": 2290
        },
        {
            "name": "Avril",
            "entreprise": avrilEntr.length,
            "particulier": avrilPart.length,
            "amt": 2000
        },
        {
            "name": "Mai",
            "entreprise": maiEntr.length,
            "particulier": maiPart.length,
            "amt": 2181
        },
        {
            "name": "Juin",
            "entreprise": juinEntr.length,
            "particulier": juinPart.length,
            "amt": 2500
        },
        {
            "name": "Juil.",
            "entreprise": juilletEntr.length,
            "particulier": juilletPart.length,
            "amt": 2100
        }, {
            "name": "Aout",
            "entreprise": aoutEntr.length,
            "particulier": aoutPart.length,
            "amt": 2290
        },
        {
            "name": "Sept.",
            "entreprise": septEntr.length,
            "particulier": septPart.length,
            "amt": 2000
        },
        {
            "name": "Oct.",
            "entreprise": octEntr.length,
            "particulier": octPart.length,
            "amt": 2181
        },
        {
            "name": "Nov.",
            "entreprise": novEntr.length,
            "particulier": novPart.length,
            "amt": 2500
        },
        {
            "name": "Dec.",
            "entreprise": decEntr.length,
            "particulier": decPart.length,
            "amt": 2100
        }
    ]
    return (
        <div className='shadow-2xl h-[40Opx] bg-white'>
            <h1 className='text-[24px] text-blue-700 border p-2'>{title}</h1>
            <hr />
            <LineChart width={730} height={250} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="entreprise" stroke="#8884d8" />
                <Line type="monotone" dataKey="particulier" stroke="#82ca9d" />
            </LineChart>
        </div>
    )
}
