import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
export default function PopupAlert({message}) {
  return (
    <Popup
    trigger={<div className='text-red-400'> {message} </div>}
    position="right center"
  >
    <div>{message}</div>
  </Popup>
  )
}
