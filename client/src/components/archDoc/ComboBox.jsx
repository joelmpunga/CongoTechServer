
import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ComboBox = ({ children,onChange }) => {

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
    <select className='border h-14 w-[300px]' name="" id="" onChange={onChange}>
      {children}
    </select>
  );
}

export default ComboBox
