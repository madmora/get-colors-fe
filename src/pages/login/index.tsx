import { Grid, IconButton, InputAdornment, Link } from '@mui/material'
import { useForm, DefaultValues, SubmitHandler } from 'react-hook-form'
import { InputText } from 'components/form-items'
import Primitives from 'primitives'
import { LockOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { UseAuth } from 'hooks'
import { Navigate, useLocation, Location, useNavigate } from 'react-router-dom'
import FormContainer from 'components/form-container'
import Button from 'components/button'
import defaultTheme from 'lib/theme/default'
import { LastPathname } from 'types'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FormLabel from 'components/form-items/FormLabel'
import { AppConstants } from 'utils/constants'

const boxStyle = {
  py: [3, 5],
  px: [3, 4],
  backgroundColor: '#edf1f2',
  borderRadius: '6px',
}

export type FormValues = {
  responsableId: string
  password: string
}

export const defaultValues: DefaultValues<FormValues> = {
  responsableId: '',
  password: '',
}

const Login = () => {
  const { isAuth, login, isError, isLoading, errorMessage } = UseAuth()
  const location: Location = useLocation()
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = ({ responsableId, password }) => {
    login({ responsableId, password })
  }

  const [isShown, setIsSHown] = useState(false)

  const togglePassword = () => {
    setIsSHown((isShown) => !isShown)
  }

  if (isAuth && !isLoading) {
    const { lastPathname = '/' } = (location?.state as LastPathname) || {}

    return <Navigate to={lastPathname} replace />
  }

  return (
    <FormContainer
      loading={isLoading}
      containerType="full"
      customContainerStyle={{
        background: [
          '#edf1f2',
          'radial-gradient(rgb(252, 247, 218), rgb(249, 201, 189))',
        ],
      }}
    >
      <Primitives.Box {...boxStyle} width={['auto', '350px']}>
        <Primitives.Flex mb={4} alignItems="center" justifyContent="center">
          <LockOutlined
            fontSize="medium"
            sx={{
              color: defaultTheme.colors.orange,
              fontSize: '28px',
              mr: '5px',
            }}
          />
          <Primitives.Text
            p={2}
            cursor="default"
            fontSize={['30px', '30px']}
            color="orange"
          >
            Iniciar Sesión
          </Primitives.Text>
        </Primitives.Flex>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputText
              name="responsableId"
              control={control}
              label="Usuario"
              externalError={isError}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputText
              name="password"
              control={control}
              label="Contraseña"
              externalError={isError}
              rules={{ required: true }}
              type={isShown ? 'text' : 'password'}
              icon={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disableRipple={true}
                      size="small"
                      onClick={togglePassword}
                    >
                      {isShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {isError && errorMessage && (
            <FormLabel type="error">*{errorMessage}</FormLabel>
          )}
          <Grid item xs={12} justifyContent="center" display="flex">
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              sx={{ width: '100%' }}
            >
              Iniciar Sesión
            </Button>
          </Grid>
          {isError && (
            <Grid item xs={12} textAlign="center">
              <Link
                onClick={() => navigate(AppConstants.ROUTE_FORGOT_PASSWORD)}
                variant="body2"
                underline="none"
                sx={{ cursor: 'pointer' }}
              >
                ¿Perdiste tu contraseña?
              </Link>
            </Grid>
          )}
        </Grid>
      </Primitives.Box>
    </FormContainer>
  )
}

export default Login
