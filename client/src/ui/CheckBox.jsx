import { useState } from 'react'

export default function CheckBox({allChk}) {
    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked(!checked)
    if(allChk){
        if(checked === false){
            setChecked(true)
        }else{
            setChecked(false)
        }

    }
    return (
        <>
            {
                checked ? <input type="checkbox" checked={checked} onChange={handleClick} className='form-checkbox text-blue-500 ' /> : <input type="checkbox" checked={checked} onChange={handleClick} className='form-checkbox text-gray-100' />
            }
        </>
    )
}
