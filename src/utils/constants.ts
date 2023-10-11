const constantsCopy = {}

const constantsPolicies = {
  ACCESS_POLICY_ADMIN: ['Administrador'],
  ACCESS_POLICY_USER: ['Usuario'],
  ACCESS_POLICY_ADMIN_USER: ['Administrador', 'Usuario'],
}

const constantsRoutes = {
  ROUTE_TIEMPOS_ATENCION: '/administracion/tiempos-de-atencion',
  ROUTE_TRAMITE: '/administracion/tramite',
  ROUTE_SEGUIMIENTO: '/administracion/seguimiento',

  // Users
  ROUTE_CHANGE_PASSWORD: '/user/change-password',
  ROUTE_USER_MANAGEMENT: '/user/management',
  ROUTE_FORGOT_PASSWORD: '/forgot-password',
  ROUTE_RESET_PASSWORD: '/reset-password/:token',
  // General
  ROUTE_ANY: '*',
  ROUTE_HOME: '/',
  ROUTE_LOGIN: '/login',
  // About
  ROUTE_ABOUT: '/acerca',
}

const constantsAssets = {
  // PDFs
  PDF_REVISION_MEDIDOR: '/pdf/revision_medidor.pdf',
  PDF_PAGO_SERVICIOS: '/pdf/pago_servicios.pdf',
  PDF_QUEJA_AMBIENTAL: '/pdf/queja_ambiental.pdf',
  PDF_DENUNCIAS_QUEJAS: '/pdf/denuncia_queja.pdf',
  PDF_OBRAS_MENORES_MANTENIMIENTO: '/pdf/obras_menores_o_mantenimiento.pdf',
  PDF_DISPONIBILIDAD_AGUA_FRACCIONAMENTO:
    '/pdf/disponibilidad_agua_Fraccionamiento.pdf',
  PDF_DISPONIBILIDAD_AGUA: '/pdf/disponibilidad_agua.pdf',
  PDF_TRAMITES_MUNICIPALES: '/pdf/tramites_municipales.pdf',
  PDF_EXONERACION: '/pdf/exoneracion.pdf',
  PDF_VISADO_MUNICIPAL_PLANOS_CATASTRO:
    '/pdf/solicitud_visado_municipal_planos_catastro.pdf',
  PDF_REALIZAR_DECLARACION: '/pdf/realizar_declaracion.pdf',
  PDF_USO_SUELO: '/pdf/uso-suelo.pdf',
  PDF_BOLETA_TRASPASO_SERVICIOS: '/pdf/boleta_traspaso_servicios.pdf',
}

const constantsGraphQL = {
  // ERROR MESSAGES
  MODAL_FORBIDDEN_ERROR_MESSAGE: 'Error de autorización!',
  MODAL_UNAUTHENTICATED_ERROR_MESSAGE: 'Error de autenticación!',
  MODAL_INTERNAL_SERVER_ERROR_MESSAGE: 'Error de servidor!',
  MODAL_UNKNOWN_ERROR_MESSAGE: 'Error desconocido!',
  // ERROR CODES
  FORBIDDEN_ERROR_CODE: 'FORBIDDEN',
  UNAUTHENTICATED_ERROR_CODE: 'UNAUTHENTICATED',
  INTERNAL_SERVER_ERROR_CODE: 'INTERNAL_SERVER_ERROR',
  UNKNOWN_ERROR_CODE: 'UNKNOWN_ERROR',
}

const constantsRegex = {
  // eslint-disable-next-line no-useless-escape
  EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  PASSWORD_REGEX:
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){10,}$/,
  TEXT_REGEX: /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/,
  TEXT_NUMBER_REGEX: /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s0-9+()[\]-]+$/,
}

const constantsDBStrings = {
  CATEGORY_INICIAR: 'iniciar',
  CATEGORY_FINALIZAR: 'finalizar',
  CATEGORY_REABRIR: 'reabrir',
  CATEGORY_TYPES: ['iniciar', 'finalizar', 'reabrir'],
}

export const formNames = {
  FORMULARIO_PARA_LA_EXONERACION_DE_IMPUESTOS:
    'Formulario para la exoneración de impuestos',
  FORMULARIO_PARA_LOS_TRAMITES_MUNICIPALES:
    'Formulario para los tramites municipales',
  FORMULARIO_PARA_EL_PAGO_DE_SERVICIOS: 'Formulario para el pago de servicios',
  FORMULARIO_PARA_QUEJAS_O_DENUNCIAS: 'Formulario para quejas o denuncias',
  FORMULARIO_PARA_QUEJAS_O_DENUNCIAS_AMBIENTALES:
    'Formulario para quejas o denuncias ambientales',
  FORMULARIO_PARA_TRAMITES_EN_ACUEDUCTOS:
    'Formulario para trámites en acueductos',
  FORMULARIO_PARA_SOLICITUD_DE_AGUA_POTABLE:
    'Formulario para solicitud de agua potable',
  FORMULARIO_DISPONIBILIDAD_DE_AGUA_FRACCIONAMIENTO_URBANIZACION:
    'Formulario disponibilidad de agua - fraccionamiento - urbanización',
  BOLETA_DE_OBRAS_MENORES_O_MANTENIMIENTO:
    'Boleta de Obras menores o Mantenimiento',
  BOLETA_DE_VISADO_DE_PLANO_DE_CATASTRO:
    'Boleta de visado de plano de catastro',
  BOLETA_DE_TRASPASO_DE_SERVICIOS: 'Boleta de traspaso de servicios',
  BOLETA_DE_SOLICITUD_DE_CERTIFICACION_DE_USO_DE_SUELO:
    'Boleta de Solicitud de Certificación de Uso de Suelo',
  FORMULARIO_PARA_LA_DECLARACION_DE_BIENES_INMUEBLES:
    'Formulario para la declaración de bienes inmuebles',
}

export const AppConstants = {
  USER: 'user',
  PAGE_MIN_HEIGHT: ['calc(100vh - 118px)', 'calc(100vh - 128px)'],
  ...constantsCopy,
  ...constantsGraphQL,
  ...constantsAssets,
  ...constantsRoutes,
  ...constantsPolicies,
  ...constantsRegex,
  ...constantsDBStrings,
  ...formNames,
}
