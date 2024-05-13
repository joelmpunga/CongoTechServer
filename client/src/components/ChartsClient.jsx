import React from 'react'
import ChartsBar from './ChartsBar'
import ChartsCell from './ChartsCell'
import ChartsBarRadial from './ChartsBarRadial'
import ChartsArea from './ChartsArea'
import ChartsComposed from './ChartsComposed'
import ChartsLine from './ChartsLine'

export default function ChartsClient() {
    return (
        <div className='flex p-5 w-auto'>
            <div>
                <ChartsArea title="Particulier VS Entreprise / Par Mois"/>
                <ChartsComposed title="Client / Par Mois" />
            </div>
            <div>
                <ChartsArea title="Particulier VS Entreprise / Par Années"/>
                <ChartsComposed title="Client / Par Années"/>
            </div>
        </div>
    )
}
