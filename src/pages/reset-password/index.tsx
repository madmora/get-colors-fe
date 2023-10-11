import { Grid, IconButton, InputAdornment } from '@mui/material'
import { useForm, DefaultValues, SubmitHandler } from 'react-hook-form'
import { InputText } from 'components/form-items'
import Primitives from 'primitives'
import FormContainer from 'components/form-container'
import Button from 'components/button'
import FormLabel from 'components/form-items/FormLabel'
import { AppConstants } from 'utils/constants'
import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import AlertModal from 'components/alert-modal'
import RESET_PASSWORD from 'gql/mutations/user/resetPassword'
import PasswordPolicyTooltip from 'components/password-policy-tooltip'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

interface Code {
  code: string
}

interface RequestPasswordResetResponse {
  resetPassword: Code
}

export type FormValues = {
  password: string
  passwordConfirm: string
}

export const defaultValues: DefaultValues<FormValues> = {
  password: '',
  passwordConfirm: '',
}

const boxStyle = {
  py: [3, 5],
  px: [3, 4],
  backgroundColor: '#edf1f2',
  borderRadius: '6px',
}

const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false)
  const [resetPasswordGql, { loading }] = useMutation(RESET_PASSWORD)
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = ({
    password,
    passwordConfirm,
  }) => {
    if (password !== passwordConfirm) {
      setErrorMessage('Las contraseñas no coinciden')
      return
    }

    setErrorMessage('')
    resetPasswordGql({
      variables: { input: { token, password } },
      onCompleted: ({ resetPassword }: RequestPasswordResetResponse) => {
        switch (resetPassword.code) {
          case 'SUCCESS':
            setOpenSuccessModal(true)
            break
          case 'ERROR_EXPIRED_RESET_PASSWORD_TOKEN':
            setErrorMessage('El token a expirado.')
            break
          case 'ERROR_NEW_PASSWORD_IS_NOT_AVAILABLE':
            setErrorMessage(
              'Debe ingresar una contraseña diferente a las ultimas 24 utilizadas.',
            )
            break
          default:
            setErrorMessage('No fue posible restablecer la contraseña.')
            break
        }
      },
      onError: () => {},
    })
  }

  const closeModals = useCallback(() => {
    setOpenSuccessModal(false)
    navigate(AppConstants.ROUTE_LOGIN)
  }, [navigate])

  const toggleOldPassword = () => {
    setIsPasswordShown((isShown) => !isShown)
  }

  return (
    <FormContainer
      loading={loading}
      containerType="full"
      customContainerStyle={{
        background: [
          '#edf1f2',
          'radial-gradient(rgb(252, 247, 218), rgb(249, 201, 189))',
        ],
      }}
      successModal={
        <AlertModal
          open={openSuccessModal}
          onClose={closeModals}
          icon="success"
          title="Transacción exitosa!"
          subtitle="Su contraseña fue actualizada correctamente"
        />
      }
    >
      <Primitives.Box {...boxStyle} width={['auto', '390px']}>
        <Primitives.Flex width={1} mb={2} flexDirection="column">
          <Primitives.Text cursor="default" fontSize={30} color="orange" pb={2}>
            Restablecer contraseña
          </Primitives.Text>
        </Primitives.Flex>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputText
              onChangeCallback={() => {
                setErrorMessage('')
              }}
              name="password"
              control={control}
              label="Contraseña"
              type={isPasswordShown ? 'text' : 'password'}
              rules={{
                required: true,
                minLength: 10,
                pattern: AppConstants.PASSWORD_REGEX,
              }}
              internalError={{
                pattern: '*Error en el formato de la contraseña',
              }}
              icon={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple={true} size="small">
                      <PasswordPolicyTooltip />
                    </IconButton>
                    <IconButton
                      disableRipple={true}
                      size="small"
                      onClick={toggleOldPassword}
                    >
                      {isPasswordShown ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputText
              onChangeCallback={() => {
                setErrorMessage('')
              }}
              name="passwordConfirm"
              control={control}
              label="Confirmar Contraseña"
              type={isPasswordShown ? 'text' : 'password'}
              rules={{
                required: true,
                minLength: 10,
                pattern: AppConstants.PASSWORD_REGEX,
              }}
              internalError={{
                pattern: '*Error en el formato de la contraseña',
              }}
              icon={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple={true} size="small">
                      <PasswordPolicyTooltip />
                    </IconButton>
                    <IconButton
                      disableRipple={true}
                      size="small"
                      onClick={toggleOldPassword}
                    >
                      {isPasswordShown ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {errorMessage && <FormLabel type="error">*{errorMessage}</FormLabel>}
          <Grid item xs={12} justifyContent="center" display="flex">
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              sx={{ width: '100%' }}
            >
              Restablecer contraseña
            </Button>
          </Grid>
        </Grid>
      </Primitives.Box>
    </FormContainer>
  )
}

export default ResetPassword
