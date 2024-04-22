import React from 'react'
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts'
export default function ChartsBarRadial() {
    const data = [
        {
            "name": "autres",
            "uv": 31.47,
            "pv": 2400,
            "fill": "#8884d8"
        },

        {
            "name": "png",
            "uv": 8.22,
            "pv": 9800,
            "fill": "#82ca9d"
        },
        {
            "name": "jpg",
            "uv": -8.63,
            "pv": 3908,
            "fill": "#a4de6c"
        },
        {
            "name": "jpeg",
            "uv": -2.63,
            "pv": 4800,
            "fill": "#d0ed57"
        },
        {
            "name": "pdf",
            "uv": 6.67,
            "pv": 4800,
            "fill": "#ffc658"
        }
    ]
    return (
        <>
            <h1 className='mx-auto w-[40%]'>Types de documents</h1>
            <RadialBarChart
                width={730}
                height={250}
                innerRadius="10%"
                outerRadius="80%"
                data={data}
                startAngle={180}
                endAngle={0}
            >
                <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
                <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
                <Tooltip />
            </RadialBarChart>
        </>
    )
}
