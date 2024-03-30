import React from 'react'

export default function SubMenu({actived,title}) {
  return (
    <>
      {actived ? <h3 className='text-white'>{title}</h3>:<h3 className='text-gray-400'>{title}</h3>}
    </>
  )
}
