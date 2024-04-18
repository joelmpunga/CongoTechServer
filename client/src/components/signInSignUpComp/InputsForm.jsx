import React from 'react'

export default function InputsForm({labelName, htmlFor, inputId, inputType, inputPlaceholder,onChange, msgErr, value, name}) {
    return (
        <div className='mb-12'>
            <label className="block text-gray-500 text-sm font-adamina mb-2" htmlFor={htmlFor}>
                {labelName}
            </label>
            <input
                className="font-adamina h-[70px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={inputId}
                type={inputType}
                placeholder={inputPlaceholder}
                onChange={onChange}
                value={value}
                name={name}
            />
             <span className='text-red-600 '>{msgErr}</span>

        </div>
    )
}
