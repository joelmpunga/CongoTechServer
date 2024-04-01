import { useState } from "react"

export default function ItemMenu({ title }) {
  const [actived, setActived] = useState(false)
  const handleClick = () => {
    setActived(!actived)
  }
  return (
    <div className="my-3 ml-10">
      {
        actived ?
          <h3 className='text-white w-[80%] text-extra-large mx-auto' onClick={handleClick}>
            {title}
          </h3> :
          <h3 className='text-gray-400 w-[80%] mx-auto text-extra-large' onClick={handleClick}>
            {title}
          </h3>
      }
    </div>
  )
}
