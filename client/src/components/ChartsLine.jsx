import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, } from 'recharts'

export default function ChartsLine({ title }) {
    const data = [
        {
            "name": "Janv.",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Fevr.",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Mars",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Avril",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Mai",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Juin",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Juil.",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        },{
            "name": "Aout",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Sept.",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Oct.",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Nov.",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Dec.",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]
    return (
        <div className='shadow-2xl h-[40Opx]'>
            <h1 className='text-[24px] text-blue-700 border p-2'>{title}</h1>
            <hr />
            <LineChart width={730} height={250} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </div>
    )
}
