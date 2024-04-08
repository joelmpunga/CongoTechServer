import React from 'react'
import ComboBox from '../ComboBox'
export default function CbxInput({ ownNametypeDoc, children,onChange }) {
    return (
        <div>
            <div className="flex flex-col ">
                <p>{ownNametypeDoc}</p>
                <ComboBox onChange={onChange}>{children}</ComboBox>
            </div>
        </div>
    )
}
