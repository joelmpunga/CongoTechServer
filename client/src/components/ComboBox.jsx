
import React from 'react'
import TextField from '@material-ui/core/TextField'; 
import Autocomplete from '@material-ui/lab/Autocomplete'; 
  
const ComboBox = () => { 
  
  const options = ['John doe', 'Joel Mpunga', 'Paulin Ciany'] 
  
  return ( 
    <div > 
       
      <Autocomplete 
        
        options={options} 
        style={{ width: 300 }} 
        renderInput={(params) => 
          <TextField {...params}  variant="outlined" />} 
      /> 
    </div> 
  ); 
} 
  
export default ComboBox
