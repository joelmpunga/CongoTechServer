
import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ComboBox = ({ children, className, name, msgErr, value, onChange }) => {

  const options = ['John doe', 'Joel Mpunga', 'Paulin Ciany']

  return (
    // <div > 

    //   <Autocomplete 

    //     options={options} 
    //     style={{ width: 300 }} 
    //     renderInput={(params) => 
    //       <TextField {...params}  variant="outlined" />} 
    //   /> 
    // </div> 
    <div className='flex flex-col'>
      <select className={className} name={name} value={value} id="" onChange={onChange}>
        {children}
      </select>
      <span className='text-red-600 '>{msgErr}</span>
    </div>
  );
}

export default ComboBox
