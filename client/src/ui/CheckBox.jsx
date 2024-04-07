import { useState } from 'react'

export default function CheckBox() {
    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked(!checked)
    return (
        <>
            {
                checked ? <input type="checkbox" checked={checked} onChange={handleClick} className='form-checkbox text-blue-500 ' /> : <input type="checkbox" checked={checked} onChange={handleClick} className='form-checkbox text-gray-100' />
            }
        </>
    )
}
