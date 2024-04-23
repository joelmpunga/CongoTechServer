import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
export default function ChartsBar({title}) {
  const data = [
    {
      "name": "Janv.",
      "doc": 4000,
      "email": 2400
    },
    {
      "name": "Fevr.",
      "doc": 3000,
      "email": 1398
    },
    {
      "name": "Mars",
      "doc": 2000,
      "email": 9800
    },
    {
      "name": "Avril",
      "doc": 2780,
      "email": 3908
    },
    {
      "name": "Mai",
      "doc": 1890,
      "email": 4800
    },
    {
      "name": "Juin",
      "doc": 2390,
      "email": 3800
    },
    {
      "name": "Juil.",
      "doc": 3490,
      "email": 4300
    },{
      "name": "Aout",
      "doc": 2390,
      "email": 3800
    },
    {
      "name": "Sept.",
      "doc": 3490,
      "email": 4300
    },{
      "name": "Oct.",
      "doc": 3490,
      "email": 4300
    },{
      "name": "Nov.",
      "doc": 2390,
      "email": 3800
    },
    {
      "name": "Dec.",
      "doc": 3490,
      "email": 4300
    }
  ]
  return (
    <>
      <h1>{title}</h1>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="doc" fill="#8884d8" />
        <Bar dataKey="email" fill="#82ca9d" />
      </BarChart>
    </>

  )
}
