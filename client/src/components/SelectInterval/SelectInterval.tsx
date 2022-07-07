import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { updateIntervalAC } from '../../store/tickers/actionCreators'
import { useAppDispatch } from '../../hooks'

const SelectInterval = () => {
  const dispatch = useAppDispatch();
  const [rate, setRate] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setRate(event.target.value as string)
    dispatch(updateIntervalAC(Number(event.target.value)))
  }
  return (
    <Box sx={{ minWidth: 120,
      margin: '20px 0'}}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Specify how often you would like to view price tickers changes (default 5 sec)
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={rate}
          label='Specify how often you would like to view price tickers changes (default 5 sec)'
          onChange={handleChange}
        >
          <MenuItem value={10000}>10s</MenuItem>
          <MenuItem value={60000}>1min</MenuItem>
          <MenuItem value={300000}>5min</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectInterval;