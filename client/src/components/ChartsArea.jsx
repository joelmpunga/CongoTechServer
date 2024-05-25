import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ChartsArea({ title }) {
    const [currentYearData, setCurrentYearData] = useState([])
    const [currentYearUndo1, setCurrentYearUndo1] = useState([])
    const [currentYearUndo2, setCurrentYearUndo2] = useState([])
    const [currentYearUndo3, setCurrentYearUndo3] = useState([])
    const [currentYearUndo4, setCurrentYearUndo4] = useState([])
    const [currentYearUndo5, setCurrentYearUndo5] = useState([])

    const getNumberCurrentYear = async () => await axios.get("http://localhost:3000/charts/document/year/" + currentYear).then(res => setCurrentYearData(res.data))
    const getNumberCurrentYearUndo1 = async () => await axios.get("http://localhost:3000/charts/document/year/" + (currentYear - 1)).then(res => setCurrentYearUndo1(res.data))
    const getNumberCurrentYearUndo2 = async () => await axios.get("http://localhost:3000/charts/document/year/" + (currentYear - 2)).then(res => setCurrentYearUndo2(res.data))
    const getNumberCurrentYearUndo3 = async () => await axios.get("http://localhost:3000/charts/document/year/" + (currentYear - 3)).then(res => setCurrentYearUndo3(res.data))
    const getNumberCurrentYearUndo4 = async () => await axios.get("http://localhost:3000/charts/document/year/" + (currentYear - 4)).then(res => setCurrentYearUndo4(res.data))
    const getNumberCurrentYearUndo5 = async () => await axios.get("http://localhost:3000/charts/document/year/" + (currentYear - 5)).then(res => setCurrentYearUndo5(res.data))

    useEffect(() => {
        getNumberCurrentYear()
        getNumberCurrentYearUndo1()
        getNumberCurrentYearUndo2()
        getNumberCurrentYearUndo3()
        getNumberCurrentYearUndo4()
        getNumberCurrentYearUndo5()
    })

    const currentYear = new Date().getFullYear();
    const data = []

    if (currentYearUndo5.length > 0) {
        data.push(
            {
                "name": currentYear - 5,
                "doc": currentYearUndo5.length,
                "email": 0,
            }
        )
    }

    if (currentYearUndo4.length > 0) {
        data.push(
            {
                "name": currentYear - 4,
                "doc": currentYearUndo4.length,
                "email": 0,
            }
        )
    }

    if (currentYearUndo3.length > 0) {
        data.push(
            {
                "name": currentYear - 3,
                "doc": currentYearUndo3.length,
                "email": 0,
            }
        )
    }

    if (currentYearUndo2.length > 0) {
        data.push(
            {
                "name": currentYear - 2,
                "doc": currentYearUndo2.length,
                "email": 0,
            }
        )
    }

    data.push(
        {
            "name": currentYear - 1,
            "doc": currentYearUndo1.length,
            "email": 0,
        }
    )
    data.push(
        {
            "name": currentYear,
            "doc": currentYearData.length,
            "email": 38,
        }
    )

    return (
        <div className='shadow-2xl h-[40Opx] bg-white'>
            <h1 className='text-[24px] text-blue-700 border p-2'>{title}</h1>
            <hr />            <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="doc" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="email" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </div>
    )
}
