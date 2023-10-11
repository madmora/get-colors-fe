import { Grid } from '@mui/material'
import defaultTheme from 'lib/theme/default'
import Primitives from 'primitives'

type Variant = 'error' | 'message'
interface FormLabelProps {
  children: React.ReactNode
  sx?: Object
  innerStyle?: Object
  type?: Variant
}

const errorStyled = {
  color: defaultTheme.colors.error,
  fontSize: '12px',
}

const FormLabel = ({
  children,
  sx,
  innerStyle,
  type = 'message',
}: FormLabelProps) => {
  const typeStyled = type === 'message' ? {} : errorStyled

  return (
    <Grid item xs={12} {...typeStyled} sx={sx}>
      <Primitives.Box fontWeight={2} fontSize={3} {...innerStyle}>
        {children}
      </Primitives.Box>
    </Grid>
  )
}

export default FormLabel
