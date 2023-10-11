import { Grid, IconButton, InputAdornment } from '@mui/material'
import { useForm, DefaultValues, SubmitHandler } from 'react-hook-form'
import { Dropdown, InputText } from 'components/form-items'
import FormContainer from 'components/form-container'
import { UseAuth } from 'hooks'
import Button from 'components/button'
import { useMutation } from '@apollo/client'
import Modal from 'components/modal'
import { AppConstants } from 'utils/constants'
import CREATE_USER from 'gql/mutations/user/createUser'
import Primitives from 'primitives'
import { useCallback, useState } from 'react'
import GET_USERS from 'gql/queries/user/getUsers'
import { User } from 'types'
import PasswordPolicyTooltip from 'components/password-policy-tooltip'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import AlertModal from 'components/alert-modal'

interface SignInResponse {
  signIn: UserAuthCode
}
interface UserAuthCode {
  code: string
  authorization: string
  user: User
}

export type FormValues = {
  nombre: string
  apellidos: string
  cedula: string
  email: string
  direccion: string
  password: string
  rol: string
}

export const defaultValues: DefaultValues<FormValues> = {
  nombre: '',
  apellidos: '',
  cedula: '',
  email: '',
  direccion: '',
  password: '',
  rol: 'usuario',
}
interface CreateUserModalProps {
  open: boolean
  onClose: () => void
  onCreated: () => void
}

const CreateUserModal = ({
  open,
  onClose,
  onCreated,
}: CreateUserModalProps) => {
  const { auth } = UseAuth()
  const [isIdError, setIsIdError] = useState<boolean>(false)
  const [isEmailError, setIsEmailError] = useState<boolean>(false)
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false)
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false)
  const [createUser, { loading, data, error }] = useMutation(CREATE_USER)

  const { handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    setIsIdError(false)
    setIsEmailError(false)
    const graphqlData = { ...formData, responsable: auth?.user?.cedula }

    createUser({
      refetchQueries: [
        {
          query: GET_USERS,
        },
      ],
      variables: { input: graphqlData },
      onCompleted: ({ signIn }: SignInResponse) => {
        switch (signIn.code) {
          case 'SUCCESS':
            setOpenSuccessModal(true)
            break
          case 'ERROR_EMAIL_USED':
            setIsEmailError(true)
            break
          case 'ERROR_ID_USED':
            setIsIdError(true)
        }
      },
      onError: () => {},
    })
  }

  const closeModals = useCallback(() => {
    setOpenSuccessModal(false)
    if (!error) {
      reset()
      onCreated()
    }
  }, [error, onCreated, reset])

  const toggleOldPassword = () => {
    setIsPasswordShown((isShown) => !isShown)
  }

  return (
    <Modal open={open} disableOutsideClose onClose={onClose}>
      <Primitives.Box maxWidth="600px">
        <FormContainer
          title="Crear un nuevo usuario"
          loading={loading}
          containerType="full"
          customContainerStyle={{ minHeight: 'inherit' }}
          successModal={
            <AlertModal
              open={openSuccessModal}
              onClose={closeModals}
              icon="success"
              title="Registro exitoso!"
              subtitle={`${data?.signIn?.user?.nombre} fue creado exitosamente en el sistema`}
            />
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputText
                name="nombre"
                control={control}
                label="Nombre"
                rules={{ required: true, maxLength: 20 }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                name="apellidos"
                control={control}
                label="Apellidos"
                rules={{ required: true, maxLength: 40 }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                name="cedula"
                control={control}
                label="Cedula"
                type="number"
                externalError={isIdError}
                externalErrorMessage="*Esta cedula ya a sido usada por otro usuario"
                rules={{ required: true, maxLength: 20 }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                name="email"
                control={control}
                label="Email"
                externalError={isEmailError}
                externalErrorMessage="*Este correo ya a sido usado por otro usuario"
                rules={{
                  required: true,
                  maxLength: 40,
                  pattern: AppConstants.EMAIL_REGEX,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                name="password"
                control={control}
                label="Password"
                type={isPasswordShown ? 'text' : 'password'}
                rules={{
                  required: true,
                  maxLength: 20,
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
              <Dropdown
                name="rol"
                control={control}
                label="Rol"
                options={[
                  {
                    label: 'Usuario',
                    value: 'usuario',
                  },
                  {
                    label: 'Administrador',
                    value: 'administrador',
                  },
                ]}
                rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                name="direccion"
                control={control}
                label="Dirección"
                rules={{ required: true, maxLength: 100 }}
              />
            </Grid>

            <Grid item xs={12} justifyContent="center" display="flex">
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="outlined"
                rounded
              >
                Crear usuario
              </Button>
            </Grid>
          </Grid>
        </FormContainer>
      </Primitives.Box>
    </Modal>
  )
}

export default CreateUserModal
