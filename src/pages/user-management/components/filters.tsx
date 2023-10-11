import { Grid } from '@mui/material'
import Button from 'components/button'
import Dropdown from 'components/dropdown'
import InputText from 'components/input-text'
import {
  updateUserFiltersRole,
  updateUserFiltersState,
  updateUserFiltersSearchKey,
  updateUserFiltersSearchValue,
} from 'lib/apollo/operations/userFilters'
import Primitives from 'primitives'

const containerStyled = {
  pb: 3,
}

interface FiltersProps {
  onChange?: () => void
  onCreateUser: () => void
}

const Filters = ({ onChange, onCreateUser }: FiltersProps) => {
  const handleSearchCriteriaChange = (value: string) => {
    updateUserFiltersSearchKey(value)
    onChange && onChange()
  }

  const handleCriteriaChange = (value: string) => {
    updateUserFiltersSearchValue(value)
    onChange && onChange()
  }

  const handleRolChange = (value: string) => {
    updateUserFiltersRole(value)
    onChange && onChange()
  }

  const handleStateChange = (value: string) => {
    updateUserFiltersState(value)
    onChange && onChange()
  }

  return (
    <Primitives.Flex {...containerStyled}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <Dropdown
            label="Estado"
            onChange={handleStateChange}
            options={[
              { value: '', label: 'Todos' },
              { value: 'active', label: 'Activo' },
              { value: 'inactive', label: 'Inactivo' },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Dropdown
            label="Rol"
            onChange={handleRolChange}
            options={[
              { value: '', label: 'Todos' },
              { value: 'usuario', label: 'Usuario' },
              { value: 'administrador', label: 'Administrador' },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Dropdown
            label="Criterio de busqueda"
            onChange={handleSearchCriteriaChange}
            options={[
              { value: 'nombre', label: 'Nombre' },
              { value: 'cedula', label: 'Cedula' },
              { value: 'direccion', label: 'Dirección' },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <InputText label="Búsqueda" onChange={handleCriteriaChange} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Primitives.Flex width={1}>
            <Button
              onClick={onCreateUser}
              sx={{ width: ['100%', 'auto'] }}
              variant="outlined"
            >
              Agregar un usuario
            </Button>
          </Primitives.Flex>
        </Grid>
      </Grid>
    </Primitives.Flex>
  )
}

export default Filters
