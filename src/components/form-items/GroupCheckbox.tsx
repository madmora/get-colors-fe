import { FormControl, FormGroup, FormLabel } from '@mui/material'
import { Rules } from './types'
import { hasData } from 'utils'
import Checkbox from './Checkbox'

interface Option {
  label: string
  value: string
}

interface GroupCheckboxProps {
  control: any
  label?: string
  options: Option[]
  row?: boolean
  rules?: Rules
  justifyContent?: string
}

const GroupCheckbox = ({
  control,
  label,
  options,
  row,
  rules,
  justifyContent,
}: GroupCheckboxProps) => (
  <FormControl sx={{ width: 1 }}>
    {label && <FormLabel>{label}</FormLabel>}
    <FormGroup row={row} sx={{ justifyContent }}>
      {hasData(options) &&
        options.map((option: any) => (
          <Checkbox
            key={option.value}
            label={option.label}
            name={option.value}
            rules={rules || {}}
            control={control}
          />
        ))}
    </FormGroup>
  </FormControl>
)

export default GroupCheckbox
