import { ValidationRule } from 'react-hook-form'

export interface Rules {
  required?: string | ValidationRule<boolean>
  min?: ValidationRule<number | string>
  max?: ValidationRule<number | string>
  maxLength?: ValidationRule<number>
  minLength?: ValidationRule<number>
  pattern?: ValidationRule<RegExp>
  validate?: any
}
