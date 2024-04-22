import React from 'react'
import ChartsBar from './ChartsBar'
import ChartsCell from './ChartsCell'
import ChartsBarRadial from './ChartsBarRadial'
import ChartsArea from './ChartsArea'
import ChartsComposed from './ChartsComposed'
import ChartsLine from './ChartsLine'

export default function ChartsDocuments() {
    return (
        <div className='flex p-5 w-auto'>
            <div>
                <ChartsBar />
                <ChartsCell />
                <ChartsComposed />
            </div>
            <div>
                <ChartsBarRadial />
                <ChartsArea />
                <ChartsLine/>
            </div>
            <div>
                
            </div>
        </div>
    )
}
