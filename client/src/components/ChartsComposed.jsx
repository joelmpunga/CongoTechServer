import { ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, Bar, Line } from 'recharts'

export default function ChartsComposed({ title }) {
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
            <hr />            <ComposedChart width={730} height={250} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
        </div>
    )
}
