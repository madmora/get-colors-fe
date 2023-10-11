import {
  Checkbox as CheckboxMUI,
  FormControl,
  FormControlLabel,
} from '@mui/material'
import Primitives from 'primitives'
import { Controller } from 'react-hook-form'
import { Rules } from './types'

interface CheckboxProps {
  name: string
  control: any
  label?: string
  rules?: Rules
  errorMessage?: string | React.ReactNode
  onChangeCallback?: (value: boolean) => void
}

const Checkbox = ({
  control,
  name,
  label,
  rules,
  onChangeCallback,
  errorMessage,
}: CheckboxProps) => (
  <FormControl>
    <Controller
      name={name}
      rules={rules || {}}
      control={control}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        <>
          <FormControlLabel
            color="red"
            control={
              <CheckboxMUI
                {...field}
                checked={!!value}
                onChange={(e) => {
                  onChange(e)
                  onChangeCallback && onChangeCallback(e.target.checked)
                }}
              />
            }
            label={label}
          />

          {errorMessage && error && error.type === 'required' && (
            <>{errorMessage}</>
          )}

          {!errorMessage && error && error.type === 'required' && (
            <Primitives.Text color="red" fontSize={1}>
              * Checkbox required
            </Primitives.Text>
          )}
        </>
      )}
    />
  </FormControl>
)

export default Checkbox
