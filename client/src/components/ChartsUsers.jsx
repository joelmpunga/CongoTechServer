import React from 'react'
import ChartsBar from './ChartsBar'
import ChartsCell from './ChartsCell'
import ChartsBarRadial from './ChartsBarRadial'
import ChartsArea from './ChartsArea'
import ChartsComposed from './ChartsComposed'
import ChartsLine from './ChartsLine'

export default function ChartsUser() {
    return (
        <div className='flex p-5 w-auto'>
            <ChartsCell title="ADMIN Vs SECRETAIRE"/>
            <ChartsCell title="ACTIF Vs INACTIF"/>
        </div>
    )
}
