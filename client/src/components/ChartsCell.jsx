import React from 'react'
import { PieChart, Pie, Cell, Legend } from 'recharts'

export default function ChartsCell({title}) {
    const data = [
        {
            "name": "PDF",
            "value": 561,
            "fill": "#8884d8"
        },
        {
            "name": "PNG",
            "value": 731,
            "fill": "#88a7d0"
        },
    ]
    return (
        <>
            <h1>{title}</h1>
            <PieChart width={730} height={250}>
                <Pie data={data} cx="50%" cy="50%" outerRadius={80} label>
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))
                    }
                </Pie>
            </PieChart>
        </>
    )
}
