import { Grid } from '@mui/material'
import { useForm, DefaultValues, SubmitHandler } from 'react-hook-form'
import { Dropdown, InputText } from 'components/form-items'
import FormContainer from 'components/form-container'
import { UseAuth } from 'hooks'
import Button from 'components/button'
import { useMutation } from '@apollo/client'
import Modal from 'components/modal'
import { AppConstants } from 'utils/constants'
import EDIT_USER from 'gql/mutations/user/editUser'
import Primitives from 'primitives'
import { useCallback, useState } from 'react'
import GET_USERS from 'gql/queries/user/getUsers'
import { User } from 'types'
import AlertModal from 'components/alert-modal'

interface EditUserResponse {
  editUser: Code
}
interface Code {
  code: string
}

export type FormValues = {
  cedula: string
  email: string
  nombre: string
  apellidos: string
  direccion: string
  rol: string
}

interface EditUserModalProps {
  open: boolean
  onClose: () => void
  onEdit: () => void
  user: User
}

const EditUserModal = ({ open, onClose, onEdit, user }: EditUserModalProps) => {
  const { auth } = UseAuth()
  const [isIdError, setIsIdError] = useState<boolean>(false)
  const [isEmailError, setIsEmailError] = useState<boolean>(false)
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false)
  const [editUser, { loading, error }] = useMutation(EDIT_USER)

  const defaultValues: DefaultValues<FormValues> = {
    cedula: user.cedula,
    email: user.email,
    nombre: user.nombre,
    apellidos: user.apellidos,
    direccion: user.direccion,
    rol: user.rol.toLowerCase(),
  }

  const { handleSubmit, reset, control } = useForm<FormValues>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    setIsIdError(false)
    setIsEmailError(false)
    const graphqlData = {
      ...formData,
      responsable: auth?.user?.cedula,
      cedulaActual: user.cedula,
      emailActual: user.email,
    }

    editUser({
      refetchQueries: [
        {
          query: GET_USERS,
        },
      ],
      variables: { input: graphqlData },
      onCompleted: ({ editUser }: EditUserResponse) => {
        if (editUser.code === 'SUCCESS') {
          setOpenSuccessModal(true)
        } else if (editUser.code === 'ERROR_EMAIL_USED') {
          setIsEmailError(true)
        } else if (editUser.code === 'ERROR_ID_USED') {
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
      onEdit()
    }
  }, [error, onEdit, reset])

  return (
    <Modal open={open} disableOutsideClose onClose={onClose}>
      <Primitives.Box maxWidth="600px">
        <FormContainer
          title="Actualización de usuario"
          loading={loading}
          containerType="full"
          customContainerStyle={{ minHeight: 'inherit' }}
          successModal={
            <AlertModal
              open={openSuccessModal}
              onClose={closeModals}
              icon="success"
              title="Actualización exitosa!"
              subtitle={
                'El usuario fue actualizado exitosamente en el sistema.'
              }
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
                Actualizar información
              </Button>
            </Grid>
          </Grid>
        </FormContainer>
      </Primitives.Box>
    </Modal>
  )
}

export default EditUserModal
