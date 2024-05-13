import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const SelectionBox = ({ states, getState ,orderId,varientId}) => {
  const [state, setState] = useState([]);

  const theme = useTheme();

  const handleChange = (event) => {
    setState(event?.target?.value);
    getState(event?.target?.value,orderId,varientId); 
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 150 }}>
        <InputLabel id='demo-multiple-name-label'>Drop</InputLabel>
        <Select
          labelId='demo-multiple-name-label'
          id='demo-multiple-name'
          multiple
          value={state}
          onChange={handleChange}
          input={<OutlinedInput label='Name' />}
          MenuProps={MenuProps}
        >
          {states?.map((state, index) => (
            <MenuItem key={index} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectionBox;