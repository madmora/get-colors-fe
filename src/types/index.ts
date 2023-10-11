export type UserAuth =
  | {
      authorization: string
      user: User
    }
  | undefined

export interface User {
  activo: number
  cedula: string
  email: string
  nombre: string
  apellidos: string
  direccion: string
  rol: string
}

export interface AttentionTime {
  nombre: string
  boleta: number
  fecha: number
  hora: string
  tiempo: string
  tipo: string
  seguimientoActivo: number
}

export interface UserCredentials {
  responsableId: string
  password: string
}

export interface ModalError {
  open: boolean
  message: string
  code: string
  subMessage?: string
}

export interface LastPathname {
  lastPathname: string
}

export type Order = 'asc' | 'desc'

export interface Search {
  key: string
  value: string
}
export interface UserFilterFormat {
  search: Search
  role: string
  state: string
}

export interface UserFilters {
  users: User[]
  result: User[]
  filters: UserFilterFormat
}

export interface MonitoringCategory {
  id: number
  nombre: string
  descripcion: string
  responsable: string
  fecha: number
  activo: number
  codigo: string
}

export interface MonitoringCategoryFormat {
  search: Search
  state: string
}

export interface MonitoringCategoryFilters {
  data: MonitoringCategory[]
  result: MonitoringCategory[]
  filters: MonitoringCategoryFormat
}

export interface Monitoring {
  seguimientoId: number
  boleta: number
  tramite: string
  tipoFormulario: string
  fechaCreacion: number
  fechaModificacion: number
  responsable: string
  activo: number
  email: string
  telefono: string
  notificado: number
}

export interface MonitoringFormat {
  search: Search
  state: string
}

export interface MonitoringFilters {
  data: Monitoring[]
  result: Monitoring[]
  filters: MonitoringFormat
}
