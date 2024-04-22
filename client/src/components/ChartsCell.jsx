import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'

export default function ChartsCell() {
    const data = [
        {
            "name": "PDF",
            "value": 561
        },
        {
            "name": "PNG",
            "value": 731
        },
        {
            "name": "JPEG",
            "value": 284
        },
        {
            "name": "JPG",
            "value": 209
        },
    ]
    return (

        <PieChart width={730} height={250}>
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} label>
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`#${entry.value}`} />
                    ))
                }
            </Pie>
        </PieChart>
    )
}
