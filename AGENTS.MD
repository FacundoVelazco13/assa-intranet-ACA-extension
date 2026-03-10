# Agents Configuration

## Información del proyecto

### Análisis del Proyecto

Tipo: Extensión de Alfresco Content App (ACA) - Intranet corporativa
Stack: Angular 19, Nx, Alfresco ADF
Proyectos principales:

| Proyecto | Propósito |
|----------|-----------|

| app | Aplicación principal ACA |
| ext | Extensión custom (este repo) |
| aca-shared | Componentes compartidos |
| aca-content | Contenido ACA |
| collabora-extension | Integración Collabora |

### Comandos disponibles

- `npm install` - Instalar dependencias
- `npm start` - Iniciar desarrollo
- `npm run build` - Build completo
- `npm run lint` - Linting del código
- `npm run typecheck` - Verificación de tipos
- `nx test <project>` - Tests unitarios
- `nx test <project> -- --watch` - Tests en modo watch
- `nx build <project>` - Build de un proyecto específico

## Configuración

### Variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```yml
BASE_URL="<URL>" # URL del servidor ACS (Alfresco Content Services)
```

## Testing

- Framework: Karma + Jasmine
- Coverage: Se genera automáticamente en `./coverage/<project>/`
- Ver reportes HTML después de correr tests

## Proyectos internos

### Ext

> Extensión principal de la intranet

- `components/`: Vistas (dossier, record, dashboard, search)
- `services/`: Custom node API, content management
- `store/`: Effects, actions (Redux/NGRX)
- `rules/`: Permisos y reglas
- `utils/`: Utilidades

Servicios clave

- CustomNodeApiService: API de nodos
- CustomContentManagementService: Gestión de contenido
- CustomContentApiService: Operaciones CRUD
  Components principales
- DossierView, RecordView, IntranetPage
- Dashboards: Home, GI, OYM
- Navbar: CustomMenu, MetaExpandMenu, Docs
- Search: IntranetSearchInput, IntranetSearchResult

## Store (NGRX)

### Actions

- `dossier.actions.ts` - Acciones para dossieres
- `record.actions.ts` - Acciones para registros
- `search.actions.ts` - Acciones para búsqueda
- `intranet-router.actions.ts` - Navegación
- `association.actions.ts` - Associations
- `files.actions.ts` - Archivos

### Effects

- `dossier.effects.ts` - Efectos para dossieres
- `record.effects.ts` - Efectos para registros
- `search.effects.ts` - Efectos para búsqueda
- `association.effects.ts` - Associations
- `files.effects.ts` - Archivos
- `intranet-router.effects.ts` - Navegación

## Convenciones

### Estilo de código

- Componentes standalone de Angular
- Naming: kebab-case para archivos, PascalCase para componentes
- Preferir `const` sobre `let`
- Tipado estricto con TypeScript

### Patrones usados

- NGRX para gestión de estado
- Servicios para lógica de negocio
- Componentes presentacionales vs contenedores
- RXJS para operaciones asíncronas

## Problemas comunes

### Errores frecuentes

- **BASE_URL no configurada**: Crear `.env` con la URL del servidor ACS
- **Errores de build**: Verificar que las dependencias estén instaladas con `npm install`
- **Tests fallando**: Ejecutar con `--watch` para debug
