import React from 'react'
import ChartsBar from './ChartsBar'
import ChartsCell from './ChartsCell'
import ChartsBarRadial from './ChartsBarRadial'
import ChartsArea from './ChartsArea'
import ChartsComposed from './ChartsComposed'
import ChartsLine from './ChartsLine'

export default function ChartsMails() {
    return (
        <div className='flex gap-5 p-5 w-auto overflow-x-auto h-[760px]'>
            <div className='flex flex-col gap-10'>
                <ChartsBar title="DOCUMENTS Vs EMAIL / Mois" />
                <ChartsCell title="Classé Vs Non Classé" />
                <ChartsComposed title="MAILS / Mois" />
            </div>
            <div className='flex flex-col gap-10'>
                <ChartsArea title="DOCUMENTS Vs EMAIL / Années" />
                <ChartsLine title="DOCUMENTS Vs EMAIL / Mois" />
            </div>
        </div>
    )
}
