import React from 'react'
import { PieChart, Pie, Cell, Legend } from 'recharts'

export default function ChartsCell({ title, active, inactive }) {
    const data = [
        {
            "name": "Classé",
            "value": active,
            "fill": "#8884d8"
        },
        {
            "name": "Non Classé",
            "value": inactive,
            "fill": "#88a7d0"
        },
    ]
    return (
        <div className='shadow-2xl h-[40Opx] bg-white'>
            <h1 className='text-[24px] text-blue-700 border p-2'>{title}</h1>
            <hr />
            <PieChart width={730} height={250}>
                <Pie data={data} cx="50%" cy="50%" outerRadius={80} label>
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))
                    }
                </Pie>
                <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
            </PieChart>
        </div>
    )
}
