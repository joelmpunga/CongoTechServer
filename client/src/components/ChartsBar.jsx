import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function ChartsBar({ title }) {
  const [janv, setJanv] = useState([])
  const [fevr, setFevr] = useState([])
  const [mars, setMars] = useState([])
  const [avril, setAvril] = useState([])
  const [mai, setMai] = useState([])
  const [juin, setJuin] = useState([])
  const [juillet, setJuillet] = useState([])
  const [aout, setAout] = useState([])
  const [sept, setSept] = useState([])
  const [oct, setOct] = useState([])
  const [nov, setNov] = useState([])
  const [dec, setDec] = useState([])

  const getNumberJanv = async () => await axios.get("http://localhost:3000/charts/document/month/01").then(res => setJanv(res.data))
  const getNumberFevr = async () => await axios.get("http://localhost:3000/charts/document/month/02").then(res => setFevr(res.data))
  const getNumberMars = async () => await axios.get("http://localhost:3000/charts/document/month/03").then(res => setMars(res.data))
  const getNumberAvril = async () => await axios.get("http://localhost:3000/charts/document/month/04").then(res => setAvril(res.data))
  const getNumberMai = async () => await axios.get("http://localhost:3000/charts/document/month/05").then(res => setMai(res.data))
  const getNumberJuin = async () => await axios.get("http://localhost:3000/charts/document/month/06").then(res => setJuin(res.data))
  const getNumberJuillet = async () => await axios.get("http://localhost:3000/charts/document/month/07").then(res => setJuillet(res.data))
  const getNumberAout = async () => await axios.get("http://localhost:3000/charts/document/month/08").then(res => setAout(res.data))
  const getNumberSept = async () => await axios.get("http://localhost:3000/charts/document/month/09").then(res => setSept(res.data))
  const getNumberOct = async () => await axios.get("http://localhost:3000/charts/document/month/10").then(res => setOct(res.data))
  const getNumberNov = async () => await axios.get("http://localhost:3000/charts/document/month/11").then(res => setNov(res.data))
  const getNumberDec = async () => await axios.get("http://localhost:3000/charts/document/month/12").then(res => setDec(res.data))
  useEffect(() => {
    getNumberJanv();
    getNumberFevr();
    getNumberMars();
    getNumberAvril();
    getNumberMai();
    getNumberJuin();
    getNumberJuillet();
    getNumberAout();
    getNumberSept();
    getNumberOct();
    getNumberNov();
    getNumberDec();
  }, [])
  const data = [
    {
      "name": "Janv.",
      "entrants": janv.filter(file =>(file.type.includes('Entrant'))).length,
      "sortants": janv.filter(file =>(file.type.includes('Sortant'))).length
    },
    {
      "name": "Fevr.",
      "entrants": fevr.filter(file =>(file.type.includes('Entrant'))).length,
      "sortants": fevr.filter(file =>(file.type.includes('Sortant'))).length
    },
    {
      "name": "Mars",
      "entrants": mars.filter(file =>(file.type.includes('Entrant'))).length,
      "sortants": mars.filter(file =>(file.type.includes('Sortant'))).length
    },
    {
      "name": "Avril",
      "entrants": avril.filter(file =>(file.type.includes('Entrant'))).length,
      "sortants": avril.filter(file =>(file.type.includes('Sortant'))).length
    },
    {
      "name": "Mai",
      "entrants": mai.filter(file =>(file.type.includes('Entrant'))).length,
      "sortants": mai.filter(file =>(file.type.includes('Sortant'))).length
    },
    {
      "name": "Juin",
      "entrants": juin.filter(file =>(file.type.includes('Entrant'))).length,
      "sortants": juin.filter(file =>(file.type.includes('Sortant'))).length
    },
    {
      "name": "Juil.",
      "entrants": juillet.filter(file =>(file.type.includes('Entrant'))).length,
      "sortants": juillet.filter(file =>(file.type.includes('Sortant'))).length
    }, {
      "name": "Aout",
      "entrants": aout.filter(file =>(file.type.includes('Entrant'))).length,
      "sortants": aout.filter(file =>(file.type.includes('Sortant'))).length
    },
    {
      "name": "Sept.",
      "entrants": sept.filter(file =>(file.type.includes('Entrant'))).length,
      "sortants": sept.filter(file =>(file.type.includes('Sortant'))).length
    }, 
    {
      "name": "Oct.",
      "entrants": oct.filter(file =>(file.type.includes('Entrant'))).length,
      "sortants": oct.filter(file =>(file.type.includes('Sortant'))).length
    }, {
      "name": "Nov.",
      "entrants": nov.filter(file =>(file.type.includes('Entrant'))).length,
      "sortants": nov.filter(file =>(file.type.includes('Sortant'))).length
    },
    {
      "name": "Dec.",
      "entrants": dec.filter(file =>(file.type.includes('Entrant'))).length,
      "sortants": dec.filter(file =>(file.type.includes('Sortant'))).length
    }
  ]
  return (
    <div className='shadow-2xl h-[40Opx] bg-white'>
      <h1 className='text-[24px] text-blue-700 border p-2'>{title}</h1>
      <hr />
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="entrants" fill="#8884d8" />
        <Bar dataKey="sortants" fill="#82ca9d" />
      </BarChart>
    </div>
  )
}
