/* eslint-disable license-header/header */
import { NodeAssociationEntry } from '@alfresco/js-api';

/**
 * 30 nodos sintéticos para pruebas de asociaciones bidireccionales
 * Incluye diferentes tipos de nodos: procedimientos, expedientes, políticas, carpetas y contenidos
 */
export const NODOS_SINTETICOS: NodeAssociationEntry[] = [
  {
    entry: {
      id: 'synthetic-node-001',
      name: 'Procedimiento de Auditoría Interna 2024',
      nodeType: 'oym:procedimiento',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-01-15T10:30:00'),
      modifiedAt: new Date('2024-10-20T14:45:00'),
      createdByUser: { id: 'admin', displayName: 'Administrador' },
      modifiedByUser: { id: 'admin', displayName: 'Administrador' },
      properties: {
        'cm:title': 'Auditoría Interna',
        'cm:description': 'Procedimiento para realizar auditorías internas de calidad'
      },
      allowableOperations: ['delete', 'update', 'create', 'updatePermissions']
    }
  },
  {
    entry: {
      id: 'synthetic-node-002',
      name: 'Expediente Legal - Caso 2024-0045',
      nodeType: 'oym:expediente',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-02-10T09:15:00'),
      modifiedAt: new Date('2024-11-05T16:20:00'),
      createdByUser: { id: 'jperez', displayName: 'Juan Pérez' },
      modifiedByUser: { id: 'mgarcia', displayName: 'María García' },
      properties: {
        'cm:title': 'Caso Legal 2024-0045',
        'cm:description': 'Expediente relacionado con litigio comercial'
      },
      allowableOperations: ['delete', 'update', 'updatePermissions']
    }
  },
  {
    entry: {
      id: 'synthetic-node-003',
      name: 'Política de Seguridad de la Información',
      nodeType: 'oym:politica',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-01-05T11:00:00'),
      modifiedAt: new Date('2024-09-15T13:30:00'),
      createdByUser: { id: 'admin', displayName: 'Administrador' },
      modifiedByUser: { id: 'asanchez', displayName: 'Ana Sánchez' },
      properties: {
        'cm:title': 'Seguridad Información',
        'cm:description': 'Directrices para el manejo seguro de información confidencial'
      },
      allowableOperations: ['update']
    }
  },
  {
    entry: {
      id: 'synthetic-node-004',
      name: 'Carpeta de Documentos Financieros',
      nodeType: 'cm:folder',
      isFile: false,
      isFolder: true,
      createdAt: new Date('2024-03-20T08:00:00'),
      modifiedAt: new Date('2024-11-01T10:15:00'),
      createdByUser: { id: 'lrodriguez', displayName: 'Luis Rodríguez' },
      modifiedByUser: { id: 'lrodriguez', displayName: 'Luis Rodríguez' },
      properties: {
        'cm:title': 'Documentos Financieros',
        'cm:description': 'Repositorio de documentos del departamento financiero'
      },
      allowableOperations: ['delete', 'update', 'create']
    }
  },
  {
    entry: {
      id: 'synthetic-node-005',
      name: 'Procedimiento de Compras',
      nodeType: 'oym:procedimiento',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-01-25T14:20:00'),
      modifiedAt: new Date('2024-10-10T11:45:00'),
      createdByUser: { id: 'clopez', displayName: 'Carlos López' },
      modifiedByUser: { id: 'clopez', displayName: 'Carlos López' },
      properties: {
        'cm:title': 'Proceso de Adquisiciones',
        'cm:description': 'Procedimiento estándar para la adquisición de bienes y servicios'
      },
      allowableOperations: ['delete', 'update', 'updatePermissions']
    }
  },
  {
    entry: {
      id: 'synthetic-node-006',
      name: 'Reporte Anual 2023.pdf',
      nodeType: 'cm:content',
      isFile: true,
      isFolder: false,
      createdAt: new Date('2024-01-10T16:45:00'),
      modifiedAt: new Date('2024-01-10T16:45:00'),
      createdByUser: { id: 'admin', displayName: 'Administrador' },
      modifiedByUser: { id: 'admin', displayName: 'Administrador' },
      properties: {
        'cm:title': 'Reporte Anual 2023',
        'cm:description': 'Informe financiero del ejercicio 2023'
      },
      content: {
        mimeType: 'application/pdf',
        mimeTypeName: 'Adobe PDF Document',
        sizeInBytes: 2548960
      },
      allowableOperations: ['delete', 'update']
    }
  },
  {
    entry: {
      id: 'synthetic-node-007',
      name: 'Expediente Recursos Humanos - Contratación',
      nodeType: 'oym:expediente',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-04-15T09:30:00'),
      modifiedAt: new Date('2024-11-08T15:10:00'),
      createdByUser: { id: 'rmorales', displayName: 'Rosa Morales' },
      modifiedByUser: { id: 'rmorales', displayName: 'Rosa Morales' },
      properties: {
        'cm:title': 'Expediente Contratación',
        'cm:description': 'Documentación del proceso de contratación de personal'
      },
      allowableOperations: ['delete', 'update', 'create']
    }
  },
  {
    entry: {
      id: 'synthetic-node-008',
      name: 'Política de Privacidad y Datos Personales',
      nodeType: 'oym:politica',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-02-01T10:00:00'),
      modifiedAt: new Date('2024-08-20T12:30:00'),
      createdByUser: { id: 'admin', displayName: 'Administrador' },
      modifiedByUser: { id: 'jmartinez', displayName: 'Jorge Martínez' },
      properties: {
        'cm:title': 'Política de Privacidad',
        'cm:description': 'Normativa sobre el tratamiento de datos personales'
      },
      allowableOperations: ['update']
    }
  },
  {
    entry: {
      id: 'synthetic-node-009',
      name: 'Procedimiento de Evaluación de Desempeño',
      nodeType: 'oym:procedimiento',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-03-01T11:15:00'),
      modifiedAt: new Date('2024-10-25T14:00:00'),
      createdByUser: { id: 'pnavarro', displayName: 'Patricia Navarro' },
      modifiedByUser: { id: 'pnavarro', displayName: 'Patricia Navarro' },
      properties: {
        'cm:title': 'Evaluación de Desempeño',
        'cm:description': 'Proceso para evaluar el rendimiento del personal'
      },
      allowableOperations: ['delete', 'update', 'updatePermissions']
    }
  },
  {
    entry: {
      id: 'synthetic-node-010',
      name: 'Carpeta Proyectos 2024',
      nodeType: 'cm:folder',
      isFile: false,
      isFolder: true,
      createdAt: new Date('2024-01-02T08:30:00'),
      modifiedAt: new Date('2024-11-10T17:20:00'),
      createdByUser: { id: 'admin', displayName: 'Administrador' },
      modifiedByUser: { id: 'tcastillo', displayName: 'Teresa Castillo' },
      properties: {
        'cm:title': 'Proyectos 2024',
        'cm:description': 'Documentación de proyectos en curso durante 2024'
      },
      allowableOperations: ['delete', 'update', 'create']
    }
  },
  {
    entry: {
      id: 'synthetic-node-011',
      name: 'Procedimiento de Control de Calidad',
      nodeType: 'oym:procedimiento',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-02-15T13:45:00'),
      modifiedAt: new Date('2024-11-01T09:30:00'),
      createdByUser: { id: 'mvega', displayName: 'Manuel Vega' },
      modifiedByUser: { id: 'mvega', displayName: 'Manuel Vega' },
      properties: {
        'cm:title': 'Control de Calidad',
        'cm:description': 'Procedimiento para asegurar la calidad de productos y servicios'
      },
      allowableOperations: ['delete', 'update', 'create', 'updatePermissions']
    }
  },
  {
    entry: {
      id: 'synthetic-node-012',
      name: 'Manual de Usuario - Sistema ERP.docx',
      nodeType: 'cm:content',
      isFile: true,
      isFolder: false,
      createdAt: new Date('2024-05-20T10:15:00'),
      modifiedAt: new Date('2024-10-15T14:45:00'),
      createdByUser: { id: 'dherrera', displayName: 'Diana Herrera' },
      modifiedByUser: { id: 'dherrera', displayName: 'Diana Herrera' },
      properties: {
        'cm:title': 'Manual Sistema ERP',
        'cm:description': 'Guía de usuario para el sistema de planificación de recursos'
      },
      content: {
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        mimeTypeName: 'Microsoft Word Document',
        sizeInBytes: 1024000
      },
      allowableOperations: ['delete', 'update']
    }
  },
  {
    entry: {
      id: 'synthetic-node-013',
      name: 'Expediente Proveedores - ABC Corp',
      nodeType: 'oym:expediente',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-03-10T08:20:00'),
      modifiedAt: new Date('2024-11-05T11:40:00'),
      createdByUser: { id: 'sramirez', displayName: 'Sergio Ramírez' },
      modifiedByUser: { id: 'sramirez', displayName: 'Sergio Ramírez' },
      properties: {
        'cm:title': 'Expediente ABC Corp',
        'cm:description': 'Documentación del proveedor ABC Corporation'
      },
      allowableOperations: ['delete', 'update']
    }
  },
  {
    entry: {
      id: 'synthetic-node-014',
      name: 'Política de Gestión Ambiental',
      nodeType: 'oym:politica',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-01-20T09:00:00'),
      modifiedAt: new Date('2024-09-10T16:15:00'),
      createdByUser: { id: 'admin', displayName: 'Administrador' },
      modifiedByUser: { id: 'eortiz', displayName: 'Elena Ortiz' },
      properties: {
        'cm:title': 'Gestión Ambiental',
        'cm:description': 'Política corporativa para la protección del medio ambiente'
      },
      allowableOperations: ['update', 'updatePermissions']
    }
  },
  {
    entry: {
      id: 'synthetic-node-015',
      name: 'Procedimiento de Gestión de Riesgos',
      nodeType: 'oym:procedimiento',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-04-01T10:30:00'),
      modifiedAt: new Date('2024-10-30T13:20:00'),
      createdByUser: { id: 'fgutierrez', displayName: 'Fernando Gutiérrez' },
      modifiedByUser: { id: 'fgutierrez', displayName: 'Fernando Gutiérrez' },
      properties: {
        'cm:title': 'Gestión de Riesgos',
        'cm:description': 'Proceso para identificar y mitigar riesgos operacionales'
      },
      allowableOperations: ['delete', 'update', 'updatePermissions']
    }
  },
  {
    entry: {
      id: 'synthetic-node-016',
      name: 'Carpeta Recursos Humanos',
      nodeType: 'cm:folder',
      isFile: false,
      isFolder: true,
      createdAt: new Date('2024-01-08T07:45:00'),
      modifiedAt: new Date('2024-11-12T15:30:00'),
      createdByUser: { id: 'itorres', displayName: 'Isabel Torres' },
      modifiedByUser: { id: 'itorres', displayName: 'Isabel Torres' },
      properties: {
        'cm:title': 'RRHH',
        'cm:description': 'Documentos del departamento de Recursos Humanos'
      },
      allowableOperations: ['delete', 'update', 'create']
    }
  },
  {
    entry: {
      id: 'synthetic-node-017',
      name: 'Presupuesto 2024.xlsx',
      nodeType: 'cm:content',
      isFile: true,
      isFolder: false,
      createdAt: new Date('2024-01-05T12:00:00'),
      modifiedAt: new Date('2024-11-01T10:30:00'),
      createdByUser: { id: 'gflores', displayName: 'Gabriela Flores' },
      modifiedByUser: { id: 'gflores', displayName: 'Gabriela Flores' },
      properties: {
        'cm:title': 'Presupuesto Anual 2024',
        'cm:description': 'Planificación financiera para el ejercicio 2024'
      },
      content: {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        mimeTypeName: 'Microsoft Excel Spreadsheet',
        sizeInBytes: 512000
      },
      allowableOperations: ['delete', 'update']
    }
  },
  {
    entry: {
      id: 'synthetic-node-018',
      name: 'Expediente Cliente - XYZ Industries',
      nodeType: 'oym:expediente',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-05-05T14:30:00'),
      modifiedAt: new Date('2024-11-09T12:15:00'),
      createdByUser: { id: 'hvargas', displayName: 'Héctor Vargas' },
      modifiedByUser: { id: 'hvargas', displayName: 'Héctor Vargas' },
      properties: {
        'cm:title': 'Cliente XYZ Industries',
        'cm:description': 'Información y contratos del cliente XYZ Industries'
      },
      allowableOperations: ['delete', 'update', 'create']
    }
  },
  {
    entry: {
      id: 'synthetic-node-019',
      name: 'Política de Código de Conducta',
      nodeType: 'oym:politica',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-01-12T11:30:00'),
      modifiedAt: new Date('2024-08-25T14:00:00'),
      createdByUser: { id: 'admin', displayName: 'Administrador' },
      modifiedByUser: { id: 'jmendez', displayName: 'Julia Méndez' },
      properties: {
        'cm:title': 'Código de Conducta',
        'cm:description': 'Normas de comportamiento y ética profesional'
      },
      allowableOperations: ['update']
    }
  },
  {
    entry: {
      id: 'synthetic-node-020',
      name: 'Procedimiento de Facturación',
      nodeType: 'oym:procedimiento',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-02-20T09:45:00'),
      modifiedAt: new Date('2024-11-03T16:00:00'),
      createdByUser: { id: 'kcampos', displayName: 'Kevin Campos' },
      modifiedByUser: { id: 'kcampos', displayName: 'Kevin Campos' },
      properties: {
        'cm:title': 'Proceso de Facturación',
        'cm:description': 'Procedimiento para la emisión y gestión de facturas'
      },
      allowableOperations: ['delete', 'update', 'updatePermissions']
    }
  },
  {
    entry: {
      id: 'synthetic-node-021',
      name: 'Carpeta Contratos',
      nodeType: 'cm:folder',
      isFile: false,
      isFolder: true,
      createdAt: new Date('2024-01-15T08:00:00'),
      modifiedAt: new Date('2024-11-11T14:45:00'),
      createdByUser: { id: 'lrojas', displayName: 'Laura Rojas' },
      modifiedByUser: { id: 'lrojas', displayName: 'Laura Rojas' },
      properties: {
        'cm:title': 'Contratos',
        'cm:description': 'Repositorio de contratos y acuerdos legales'
      },
      allowableOperations: ['delete', 'update', 'create']
    }
  },
  {
    entry: {
      id: 'synthetic-node-022',
      name: 'Acta Junta Directiva - Octubre 2024.pdf',
      nodeType: 'cm:content',
      isFile: true,
      isFolder: false,
      createdAt: new Date('2024-10-15T16:00:00'),
      modifiedAt: new Date('2024-10-15T16:00:00'),
      createdByUser: { id: 'msilva', displayName: 'Mariana Silva' },
      modifiedByUser: { id: 'msilva', displayName: 'Mariana Silva' },
      properties: {
        'cm:title': 'Acta Junta - Oct 2024',
        'cm:description': 'Acta de la reunión de junta directiva del mes de octubre'
      },
      content: {
        mimeType: 'application/pdf',
        mimeTypeName: 'Adobe PDF Document',
        sizeInBytes: 384000
      },
      allowableOperations: ['delete', 'update']
    }
  },
  {
    entry: {
      id: 'synthetic-node-023',
      name: 'Expediente Legal - Caso 2024-0098',
      nodeType: 'oym:expediente',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-06-20T10:00:00'),
      modifiedAt: new Date('2024-11-10T13:25:00'),
      createdByUser: { id: 'ncastro', displayName: 'Nicolás Castro' },
      modifiedByUser: { id: 'ncastro', displayName: 'Nicolás Castro' },
      properties: {
        'cm:title': 'Caso Legal 2024-0098',
        'cm:description': 'Expediente de litigio laboral en proceso'
      },
      allowableOperations: ['delete', 'update']
    }
  },
  {
    entry: {
      id: 'synthetic-node-024',
      name: 'Política de Seguridad y Salud Ocupacional',
      nodeType: 'oym:politica',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-01-18T10:15:00'),
      modifiedAt: new Date('2024-09-05T15:45:00'),
      createdByUser: { id: 'admin', displayName: 'Administrador' },
      modifiedByUser: { id: 'oramos', displayName: 'Omar Ramos' },
      properties: {
        'cm:title': 'Seguridad y Salud',
        'cm:description': 'Directrices para la prevención de riesgos laborales'
      },
      allowableOperations: ['update', 'updatePermissions']
    }
  },
  {
    entry: {
      id: 'synthetic-node-025',
      name: 'Procedimiento de Atención al Cliente',
      nodeType: 'oym:procedimiento',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-03-15T11:00:00'),
      modifiedAt: new Date('2024-10-28T14:30:00'),
      createdByUser: { id: 'pjimenez', displayName: 'Pablo Jiménez' },
      modifiedByUser: { id: 'pjimenez', displayName: 'Pablo Jiménez' },
      properties: {
        'cm:title': 'Atención al Cliente',
        'cm:description': 'Proceso para la gestión de solicitudes y quejas de clientes'
      },
      allowableOperations: ['delete', 'update', 'updatePermissions']
    }
  },
  {
    entry: {
      id: 'synthetic-node-026',
      name: 'Carpeta Marketing y Comunicaciones',
      nodeType: 'cm:folder',
      isFile: false,
      isFolder: true,
      createdAt: new Date('2024-02-01T09:30:00'),
      modifiedAt: new Date('2024-11-08T16:20:00'),
      createdByUser: { id: 'qgonzalez', displayName: 'Quetzal González' },
      modifiedByUser: { id: 'qgonzalez', displayName: 'Quetzal González' },
      properties: {
        'cm:title': 'Marketing',
        'cm:description': 'Materiales y campañas de marketing'
      },
      allowableOperations: ['delete', 'update', 'create']
    }
  },
  {
    entry: {
      id: 'synthetic-node-027',
      name: 'Plan Estratégico 2024-2028.pptx',
      nodeType: 'cm:content',
      isFile: true,
      isFolder: false,
      createdAt: new Date('2024-01-30T15:30:00'),
      modifiedAt: new Date('2024-09-20T11:15:00'),
      createdByUser: { id: 'admin', displayName: 'Administrador' },
      modifiedByUser: { id: 'rvillalobos', displayName: 'Ricardo Villalobos' },
      properties: {
        'cm:title': 'Plan Estratégico',
        'cm:description': 'Planificación estratégica corporativa quinquenal'
      },
      content: {
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        mimeTypeName: 'Microsoft PowerPoint Presentation',
        sizeInBytes: 2048000
      },
      allowableOperations: ['delete', 'update']
    }
  },
  {
    entry: {
      id: 'synthetic-node-028',
      name: 'Expediente Auditoría Externa - 2024',
      nodeType: 'oym:expediente',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-07-10T08:45:00'),
      modifiedAt: new Date('2024-11-12T10:30:00'),
      createdByUser: { id: 'ssoto', displayName: 'Sofía Soto' },
      modifiedByUser: { id: 'ssoto', displayName: 'Sofía Soto' },
      properties: {
        'cm:title': 'Auditoría Externa 2024',
        'cm:description': 'Documentación de la auditoría financiera externa'
      },
      allowableOperations: ['delete', 'update', 'create']
    }
  },
  {
    entry: {
      id: 'synthetic-node-029',
      name: 'Política de Uso de Tecnología',
      nodeType: 'oym:politica',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-02-05T13:00:00'),
      modifiedAt: new Date('2024-08-30T12:45:00'),
      createdByUser: { id: 'admin', displayName: 'Administrador' },
      modifiedByUser: { id: 'truiz', displayName: 'Tomás Ruiz' },
      properties: {
        'cm:title': 'Uso de Tecnología',
        'cm:description': 'Normativa sobre el uso apropiado de recursos tecnológicos'
      },
      allowableOperations: ['update']
    }
  },
  {
    entry: {
      id: 'synthetic-node-030',
      name: 'Procedimiento de Continuidad del Negocio',
      nodeType: 'oym:procedimiento',
      isFile: false,
      isFolder: false,
      createdAt: new Date('2024-04-10T10:00:00'),
      modifiedAt: new Date('2024-11-07T15:00:00'),
      createdByUser: { id: 'ureyes', displayName: 'Úrsula Reyes' },
      modifiedByUser: { id: 'ureyes', displayName: 'Úrsula Reyes' },
      properties: {
        'cm:title': 'Continuidad del Negocio',
        'cm:description': 'Plan de recuperación ante desastres y contingencias'
      },
      allowableOperations: ['delete', 'update', 'create', 'updatePermissions']
    }
  }
];
