import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { map } from 'ramda'
import { useState } from 'react'
import { hasData } from 'utils'

interface Option {
  label: string
  value: string
}

interface DropdownProps {
  options: Option[]
  onChange?: (value: string) => void
  label: string
  fakeOption?: string
}

const Dropdown = ({ onChange, options, label, fakeOption }: DropdownProps) => {
  const [name, setName] = useState<string>(options[0]?.value || '')

  const handleOnChange = (event: SelectChangeEvent) => {
    setName(event.target.value as string)
    onChange && onChange(event.target.value || '')
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        labelId="search"
        value={name}
        label={label}
        onChange={handleOnChange}
      >
        {fakeOption ? (
          <MenuItem value="">
            <em>{fakeOption}</em>
          </MenuItem>
        ) : null}
        {hasData(options) &&
          map(
            (option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ),
            options,
          )}
      </Select>
    </FormControl>
  )
}

export default Dropdown
