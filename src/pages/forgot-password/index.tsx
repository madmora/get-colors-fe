import { Grid } from '@mui/material'
import { useForm, DefaultValues, SubmitHandler } from 'react-hook-form'
import { InputText } from 'components/form-items'
import Primitives from 'primitives'
import FormContainer from 'components/form-container'
import Button from 'components/button'
import FormLabel from 'components/form-items/FormLabel'
import { AppConstants } from 'utils/constants'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import REQUEST_PASSWORD_RESET from 'gql/mutations/user/requestPasswordReset'
import { useMutation } from '@apollo/client'
import AlertModal from 'components/alert-modal'

interface Code {
  code: string
}

interface RequestPasswordResetResponse {
  requestPasswordReset: Code
}

export type FormValues = {
  email: string
}

export const defaultValues: DefaultValues<FormValues> = {
  email: '',
}

const boxStyle = {
  py: [3, 5],
  px: [3, 4],
  backgroundColor: '#edf1f2',
  borderRadius: '6px',
}

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false)
  const [requestPasswordResetGql, { loading }] = useMutation(
    REQUEST_PASSWORD_RESET,
  )
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = ({ email }) => {
    setErrorMessage('')
    setIsError(false)
    requestPasswordResetGql({
      variables: { input: { email, domain: window.location.origin } },
      onCompleted: ({ requestPasswordReset }: RequestPasswordResetResponse) => {
        switch (requestPasswordReset.code) {
          case 'SUCCESS':
            setOpenSuccessModal(true)
            break
          case 'ERROR_EMAIL_DOES_NOT_MATCH':
            setIsError(true)
            setErrorMessage('El correo no se encuentra registrado.')
            break
        }
      },
      onError: () => {
        setIsError(true)
        setErrorMessage('No fue posible enviar la información.')
      },
    })
  }

  const closeModals = useCallback(() => {
    setOpenSuccessModal(false)
    navigate(AppConstants.ROUTE_LOGIN)
  }, [navigate])

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
          subtitle="Revisa tu correo para obtener el enlace de recuperación."
        />
      }
    >
      <Primitives.Box {...boxStyle} width={['auto', '390px']}>
        <Primitives.Flex width={1} mb={2} flexDirection="column">
          <Primitives.Text cursor="default" fontSize={30} color="orange" pb={2}>
            ¿Perdiste tu contraseña?
          </Primitives.Text>
          <Primitives.Text cursor="default" color="orange">
            Recibirás un correo electrónico con un enlace de recuperación
          </Primitives.Text>
        </Primitives.Flex>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputText
              name="email"
              control={control}
              label="Email"
              externalError={isError}
              rules={{
                required: true,
                maxLength: 40,
                pattern: AppConstants.EMAIL_REGEX,
              }}
            />
          </Grid>
          {isError && <FormLabel type="error">*{errorMessage}</FormLabel>}
          <Grid item xs={12} justifyContent="center" display="flex">
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              sx={{ width: '100%' }}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Primitives.Box>
    </FormContainer>
  )
}

export default ForgotPassword
