/* eslint-disable license-header/header */

/**
 * Standard Alfresco node types
 */
export enum AlfrescoNodeType {
  Folder = 'cm:folder',
  Content = 'cm:content'
}

/**
 * Custom node types for OYM content model
 * Basado en el modelo de contenido oym:contentModel
 */
export enum OymNodeType {
  // Contenedores (folder types)
  Folder = 'oym:folder',
  Procedimiento = 'oym:procedimiento',
  Formulario = 'oym:formulario',
  Politica = 'oym:politica',
  // Documentos (content types)
  Content = 'oym:content',
  ArchivoProcedimiento = 'oym:archivo-procedimiento',
  ArchivoFormulario = 'oym:archivo-formulario',
  ArchivoPolitica = 'oym:archivo-politica'
}

/**
 * Custom node types for Higiene y Seguridad (hys)
 * Basado en el modelo de contenido hys:contentModel
 */
export enum HysNodeType {
  // Contenedores (folder types)
  Folder = 'hys:folder',
  Normas = 'hys:normas',
  Instructivos = 'hys:instructivos',
  Procedimientos = 'hys:procedimientos',
  // Documentos (content types)
  Content = 'hys:content',
  Ppye = 'hys:ppye',
  ArchivoNorma = 'hys:archivo-norma',
  ArchivoInstructivo = 'hys:archivo-instructivo',
  ArchivoProcedimiento = 'hys:archivo-procedimiento'
}

/**
 * Custom node types for Políticas Comerciales (pc)
 * Basado en el modelo de contenido pc:contentModel
 */
export enum PcNodeType {
  // Contenedores (folder types)
  Folder = 'pc:folder',
  Micromedicion = 'pc:micromedicion',
  Info = 'pc:info',
  Obra = 'pc:obra',
  // Documentos (content types)
  Content = 'pc:content',
  ArchivoMicromedicion = 'pc:archivo-micromedicion',
  ArchivoInfo = 'pc:archivo-info',
  ArchivoObra = 'pc:archivo-obra'
}

/**
 * Custom node types for GI (gi)
 * Basado en el modelo de contenido gi:contentModel
 */
export enum GiNodeType {
  // Contenedores (folder types)
  Folder = 'gi:folder',
  Expediente = 'gi:expediente',
  Respuesta = 'gi:respuesta',
  Nota = 'gi:nota',
  // Documentos (content types)
  Content = 'gi:content',
  ArchivoExpediente = 'gi:archivo-expediente',
  ArchivoRespuesta = 'gi:archivo-respuesta',
  ArchivoNota = 'gi:archivo-nota'
}

/**
 * Custom node types for Callcenter (cc)
 * Basado en el modelo de contenido cc:contentModel
 */
export enum CcNodeType {
  // Contenedores (folder types)
  Folder = 'cc:folder',
  // Documentos (content types)
  Content = 'cc:content'
}

/**
 * Custom node types for Recursos Humanos (rrhh)
 * Basado en el modelo de contenido rrhh:contentModel
 */
export enum RrhhNodeType {
  // Contenedores (folder types)
  Folder = 'rrhh:folder',
  // Documentos (content types)
  Content = 'rrhh:content'
}

/**
 * Custom node types for Procesos y Calidad (pyc)
 * Basado en el modelo de contenido pyc:contentModel
 */
export enum PycNodeType {
  // Contenedores (folder types)
  Folder = 'pyc:folder',
  // Documentos (content types)
  Content = 'pyc:content'
}

/**
 * Custom node types for Atención y Fidelización (ayf)
 * Basado en el modelo de contenido ayf:contentModel
 */
export enum AyfNodeType {
  // Contenedores (folder types)
  Folder = 'ayf:folder',
  // Documentos (content types)
  Content = 'ayf:content'
}

/**
 * Custom node types for ASSA base model (assa)
 * Basado en el modelo de contenido assa:contentModel
 * Modelo base que extiende los tipos estándar de Alfresco
 */
export enum AssaNodeType {
  // Contenedores (folder types)
  Folder = 'assa:folder',
  // Documentos (content types)
  Content = 'assa:content'
}

/**
 * Lista de tipos de nodos considerados como "intranet nodes".
 * Estos son tipos custom definidos para el sistema de intranet.
 */

export const INTRANET_NODE_TYPES = [
  // Higiene y Seguridad (hys)
  ...Object.values([HysNodeType.Instructivos, HysNodeType.Ppye, HysNodeType.Normas, HysNodeType.Procedimientos]),
  // Políticas Comerciales (pc)
  ...Object.values([PcNodeType.Micromedicion, PcNodeType.Info]),
  // O&M (oym)
  ...Object.values([OymNodeType.Formulario, OymNodeType.Politica, OymNodeType.Procedimiento]),
  // GI (gi)
  ...Object.values([GiNodeType.Expediente, GiNodeType.Respuesta, GiNodeType.Nota])
];
