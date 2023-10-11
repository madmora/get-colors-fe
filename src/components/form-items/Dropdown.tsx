import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller } from 'react-hook-form'
import { Rules } from './types'
import { hasData, propOrNull } from 'utils'
import { useMemo, useState } from 'react'

interface Option {
  label: string
  value: string
}

interface DropdownProps {
  name: string
  control: any
  options: Option[]
  rules?: Rules
  label?: string
  disabled?: boolean
  onChangeCallback?: (value: string) => void
}

const Dropdown = ({
  name,
  control,
  label,
  options,
  rules,
  onChangeCallback,
  disabled = false,
}: DropdownProps) => {
  const [hasError, setHasError] = useState<boolean>(false)

  const isRequired = useMemo(
    () => hasData(rules) && propOrNull('required', rules) && rules?.required,
    [rules],
  )

  return (
    <FormControl fullWidth size="small" error={hasError} disabled={disabled}>
      {label && <InputLabel>{label}</InputLabel>}
      <Controller
        rules={rules || {}}
        control={control}
        name={name}
        render={({
          field: { onChange, value, ...field },
          fieldState: { error },
        }) => (
          <>
            <Select
              label={label}
              value={value}
              {...field}
              onChange={(e) => {
                onChange(e)
                onChangeCallback && onChangeCallback(e.target.value)
              }}
            >
              {!isRequired ? (
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
              ) : null}
              {hasData(options) &&
                options.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </Select>
            {setHasError(!!error)}
          </>
        )}
      />
    </FormControl>
  )
}

export default Dropdown
