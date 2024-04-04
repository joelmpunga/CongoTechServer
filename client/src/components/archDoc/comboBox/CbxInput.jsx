import React from 'react'
import ComboBox from './ComboBox'
export default function CbxInput({ownNametypeDoc}) {
    return (
        <div>
            <div className="flex flex-col ">
                <p>{ownNametypeDoc}</p>
                <ComboBox />
            </div>
        </div>
    )
}
