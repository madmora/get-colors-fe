import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { hasData } from 'utils'
import { Rules } from './types'

interface Option {
  label: string
  value: string
}

interface RadioButtonProps {
  name: string
  control: any
  options: Option[]
  rules?: Rules
  row?: boolean
  label?: string
}

const GroupRadioButton = ({
  name,
  control,
  options,
  rules,
  row,
  label,
}: RadioButtonProps) => {
  const [hasError, setHasError] = useState<boolean>(false)

  return (
    <FormControl error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        rules={rules || {}}
        render={({ field, fieldState: { error } }) => (
          <>
            <RadioGroup {...field} row={row}>
              {hasData(options) &&
                options.map((option, index) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    control={<Radio />}
                  />
                ))}
            </RadioGroup>
            {setHasError(!!error)}
          </>
        )}
      />
    </FormControl>
  )
}

export default GroupRadioButton
