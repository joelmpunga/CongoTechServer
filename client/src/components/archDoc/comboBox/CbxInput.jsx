import React from 'react'
import ComboBox from '../ComboBox'
export default function CbxInput({ ownNametypeDoc, children,onChange,className, name, msgErr, value }) {
    return (
        <div>
            <div className="flex flex-col text-gray-500 text-sm font-adamina mb-2">
                <p>{ownNametypeDoc}</p>
                <ComboBox value={value} name={name} msgErr={msgErr} className={className} onChange={onChange}>{children}</ComboBox>
            </div>
        </div>
    )
}




