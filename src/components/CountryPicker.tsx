import React from 'react'

import { Select, Theme, FormControl, MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const CountryPicker = ({
  selected,
  countries,
  onChange,
}: {
  selected: string
  countries: string[]
  onChange: (value: string) => void
}) => {
  const classes = useStyles()
  return (
    <FormControl className={classes.formControl}>
      <Select
        value={selected}
        variant="outlined"
        onChange={(e) => onChange(e.target.value as string)}
      >
        <MenuItem key={0} value={'global'}>
          Global
        </MenuItem>
        {countries.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CountryPicker
