import { Grid, IconButton, InputAdornment } from '@mui/material'
import {
  useForm,
  DefaultValues,
  SubmitHandler,
  FieldError,
} from 'react-hook-form'
import { FormLabel, InputText } from 'components/form-items'
import FormContainer from 'components/form-container'
import { UseAuth } from 'hooks'
import { useCallback, useEffect, useState } from 'react'
import Button from 'components/button'
import { useMutation } from '@apollo/client'
import CHANGE_PASSWORD from 'gql/mutations/user/changePassword'
import { transactionTimeVar } from 'lib/apollo/variables'
import { getUnixEpochTime } from 'utils'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { AppConstants } from 'utils/constants'
import PasswordPolicyTooltip from 'components/password-policy-tooltip'
import AlertModal from 'components/alert-modal'

interface PasswordShown {
  isShownOldPassword: boolean
  isShownNewPassword: boolean
  isShownConfirmPassword: boolean
}

interface Code {
  code: string
}

interface EditPasswordResponse {
  editPassword: Code
}

export type FormValues = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export const defaultValues: DefaultValues<FormValues> = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

const ChangePassword = () => {
  const { auth } = UseAuth()
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false)
  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD)
  const [isPasswordShown, setIsPasswordShown] = useState<PasswordShown>({
    isShownOldPassword: false,
    isShownNewPassword: false,
    isShownConfirmPassword: false,
  })

  const [errorMessage, setErrorMessage] = useState<string | JSX.Element>('')

  const { handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    const { oldPassword, newPassword, confirmPassword } = formData

    if (newPassword !== confirmPassword) {
      setErrorMessage('La nueva contraseña y su confirmación no coinciden')
      return
    }

    setIsPasswordShown({
      isShownOldPassword: false,
      isShownNewPassword: false,
      isShownConfirmPassword: false,
    })
    setErrorMessage('')

    const graphqlData = {
      oldPassword,
      newPassword,
      responsable: auth?.user?.cedula,
    }
    changePassword({
      variables: { input: graphqlData },
      onCompleted: ({ editPassword }: EditPasswordResponse) => {
        switch (editPassword.code) {
          case 'SUCCESS':
            setOpenSuccessModal(true)
            break
          case 'ERROR_CURRENT_PASSWORD_DO_NOT_MATCH':
            setErrorMessage('La contraseña actual es incorrecta')
            break
          case 'ERROR_NEW_PASSWORD_IS_NOT_AVAILABLE':
            setErrorMessage(
              'Debe ingresar una contraseña diferente a las ultimas 24 utilizadas',
            )
        }
      },
      onError: () => {
        console.log(error)
      },
    })
  }

  const closeModals = useCallback(() => {
    setOpenSuccessModal(false)
    if (!error) {
      reset()
      transactionTimeVar(getUnixEpochTime())
    }
  }, [error, reset])

  useEffect(() => {
    transactionTimeVar(getUnixEpochTime())
  }, [])

  const toggleOldPassword = () => {
    setIsPasswordShown(({ isShownOldPassword, ...rest }) => ({
      ...rest,
      isShownOldPassword: !isShownOldPassword,
    }))
  }

  const toggleNewPassword = () => {
    setIsPasswordShown(({ isShownNewPassword, ...rest }) => ({
      ...rest,
      isShownNewPassword: !isShownNewPassword,
    }))
  }

  const toggleConfirmPassword = () => {
    setIsPasswordShown(({ isShownConfirmPassword, ...rest }) => ({
      ...rest,
      isShownConfirmPassword: !isShownConfirmPassword,
    }))
  }

  const errorCallback = useCallback((error: FieldError) => {
    if (error.type === 'pattern') {
      setErrorMessage('Error en el formato de la nueva contraseña')
    }
  }, [])

  return (
    <FormContainer
      title="Cambio de contraseña"
      loading={loading}
      customInnerContainerStyle={{ maxWidth: '550px' }}
      successModal={
        <AlertModal
          open={openSuccessModal}
          onClose={closeModals}
          icon="success"
          title="La contraseña fue cambiada de forma correcta!"
        />
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <InputText
            name="oldPassword"
            control={control}
            label="Contraseña Actual"
            externalError={!!errorMessage}
            rules={{ required: true, minLength: 2 }}
            type={isPasswordShown.isShownOldPassword ? 'text' : 'password'}
            icon={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    disableRipple={true}
                    size="small"
                    onClick={toggleOldPassword}
                  >
                    {isPasswordShown.isShownOldPassword ? (
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

        <Grid item xs={12} sm={12}>
          <InputText
            name="newPassword"
            control={control}
            label="Nueva Contraseña"
            externalError={!!errorMessage}
            rules={{
              required: true,
              minLength: 2,
              pattern: AppConstants.PASSWORD_REGEX,
            }}
            errorCallback={errorCallback}
            type={isPasswordShown.isShownNewPassword ? 'text' : 'password'}
            icon={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton disableRipple={true} size="small">
                    <PasswordPolicyTooltip />
                  </IconButton>
                  <IconButton
                    disableRipple={true}
                    size="small"
                    onClick={toggleNewPassword}
                  >
                    {isPasswordShown.isShownNewPassword ? (
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

        <Grid item xs={12} sm={12}>
          <InputText
            name="confirmPassword"
            control={control}
            label="Confirmar la Contraseña"
            externalError={!!errorMessage}
            rules={{
              required: true,
              minLength: 2,
              pattern: AppConstants.PASSWORD_REGEX,
            }}
            errorCallback={errorCallback}
            type={isPasswordShown.isShownConfirmPassword ? 'text' : 'password'}
            icon={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton disableRipple={true} size="small">
                    <PasswordPolicyTooltip />
                  </IconButton>
                  <IconButton
                    disableRipple={true}
                    size="small"
                    onClick={toggleConfirmPassword}
                  >
                    {isPasswordShown.isShownConfirmPassword ? (
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
            sx={{ width: ['100%', 'inherit'] }}
          >
            Cambiar contraseña
          </Button>
        </Grid>
      </Grid>
    </FormContainer>
  )
}

export default ChangePassword
