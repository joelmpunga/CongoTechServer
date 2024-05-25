import React from 'react'
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function ChartsBarRadial({ title }) {
    //http://localhost:3000/charts/document/extension/.pdf
    const [pdf, setPdf] = useState([])
    const [png, setPng] = useState([])
    const [jpg, setJpg] = useState([])
    const [jpeg, setJpeg] = useState([])

    const getNumberPdf = async () => await axios.get("http://localhost:3000/charts/document/extension/.pdf").then(res => setPdf(res.data))
    const getNumberPng = async () => await axios.get("http://localhost:3000/charts/document/extension/.png").then(res => setPng(res.data))
    const getNumberJpg = async () => await axios.get("http://localhost:3000/charts/document/extension/.jpg").then(res => setJpg(res.data))
    const getNumberJpeg = async () => await axios.get("http://localhost:3000/charts/document/extension/.jpeg").then(res => setJpeg(res.data))


    useEffect(() => {
        getNumberPdf()
        getNumberPng()
        getNumberJpg()
        getNumberJpeg()
    })

    const data = [
        {
            "name": "png",
            "quantité": png.length,
            "pv": 9800,
            "fill": "#82ca9d"
        },
        {
            "name": "jpg",
            "quantité": jpg.length,
            "pv": 3908,
            "fill": "#a4de6c"
        },
        {
            "name": "jpeg",
            "quantité": jpeg.length,
            "pv": 4800,
            "fill": "#d0ed57"
        },
        {
            "name": "pdf",
            "quantité": pdf.length,
            "pv": 4800,
            "fill": "#ffc658"
        }
    ]
    return (
        <div className='shadow-2xl h-[40Opx] bg-white'>
            <h1 className='text-[24px] text-blue-700 border p-2'>{title}</h1>
            <hr />            
            <RadialBarChart
                width={730}
                height={250}
                innerRadius="10%"
                outerRadius="80%"
                data={data}
                startAngle={180}
                endAngle={0}
            >
                <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='quantité' />
                <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
                <Tooltip />
            </RadialBarChart>
        </div>
    )
}
