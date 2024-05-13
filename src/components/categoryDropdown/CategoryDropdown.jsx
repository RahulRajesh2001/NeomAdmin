import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import axios from 'axios'
import { baseUrl } from '../../../baseURL.js'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
const token=localStorage.getItem("adminLogin")
const CategoryDropdown = ({ category }) => {
  const [allCategories, setCateories] = useState([])
  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/admin/categories`,{
      headers: { 
        Authorization: token,
      },
    }).then((res) => {
      setCateories(res?.data?.categories)
    })
  }, [])

  let names = []
  allCategories.map((element) => {
    names.push(element?.title)
  })

  console.log("names",names)

  

  const theme = useTheme()
  const [personName, setPersonName] = React.useState([])

  const handleChange = (event) => {
    category(event?.target?.value[0])
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='demo-multiple-name-label'>Drop</InputLabel>
        <Select
          labelId='demo-multiple-name-label'
          id='demo-multiple-name'
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label='Name' />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default CategoryDropdown
