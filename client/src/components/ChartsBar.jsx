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
      "entrants": janv.length,
      "sortants": 2
    },
    {
      "name": "Fevr.",
      "entrants": fevr.length,
      "sortants": 2
    },
    {
      "name": "Mars",
      "entrants": mars.length,
      "sortants": 4
    },
    {
      "name": "Avril",
      "entrants": avril.length,
      "sortants": 3
    },
    {
      "name": "Mai",
      "entrants": mai.length,
      "sortants": 1
    },
    {
      "name": "Juin",
      "entrants": juin.length,
      "sortants": 5
    },
    {
      "name": "Juil.",
      "entrants": juillet.length,
      "sortants": 0
    }, {
      "name": "Aout",
      "entrants": aout.length,
      "sortants": 8
    },
    {
      "name": "Sept.",
      "entrants": sept.length,
      "sortants": 4
    }, 
    {
      "name": "Oct.",
      "entrants": oct.length,
      "sortants": 3
    }, {
      "name": "Nov.",
      "entrants": nov.length,
      "sortants": 7
    },
    {
      "name": "Dec.",
      "entrants": dec.length,
      "sortants": 3
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
