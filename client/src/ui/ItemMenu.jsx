import { useState } from "react"

export default function ItemMenu({ title }) {
  const [actived, setActived] = useState(false)
    const handleClick = () => {
        setActived(!actived)
    }
  return (
    <>
      {actived ? <h3 className='text-white bg-black' onClick={handleClick}>{title}</h3> : <h3 className='text-gray-400 bg-black' onClick={handleClick}>{title}</h3>}
    </>
  )
}
