import React from 'react'
import { Button as MUIButton } from '@mui/material'
import defaultTheme from 'lib/theme/default'

type Variant = 'outlined' | 'contained'
type Size = 'small' | 'medium' | 'large'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: Variant
  rounded?: boolean
  sx?: Object
  size?: Size
  disabled?: boolean
}

const outlinedStyled = {
  color: defaultTheme.colors.orange,
  borderColor: defaultTheme.colors.orange,
  fontWeight: 'bold',
  '&:hover': {
    color: '#f5b851',
    borderColor: defaultTheme.colors.orange,
  },
}

const containedStyled = {
  backgroundColor: defaultTheme.colors.orange,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#f5b851',
  },
}

const Button = ({
  children,
  onClick,
  variant = 'contained',
  sx,
  rounded,
  size = 'medium',
  disabled = false,
}: ButtonProps) => {
  const ctaStyled = variant === 'contained' ? containedStyled : outlinedStyled
  const roundedStyle = rounded ? { borderRadius: '25px' } : {}

  return (
    <MUIButton
      onClick={onClick}
      variant={variant}
      size={size}
      sx={{ ...ctaStyled, ...roundedStyle, ...sx }}
      disabled={disabled}
    >
      {children}
    </MUIButton>
  )
}

export default Button
