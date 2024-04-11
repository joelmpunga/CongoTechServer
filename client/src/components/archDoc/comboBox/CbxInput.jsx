import React from 'react'
import ComboBox from '../ComboBox'
export default function CbxInput({ ownNametypeDoc, children,onChange,className }) {
    return (
        <div>
            <div className="flex flex-col ">
                <p>{ownNametypeDoc}</p>
                <ComboBox className={className} onChange={onChange}>{children}</ComboBox>
            </div>
        </div>
    )
}
