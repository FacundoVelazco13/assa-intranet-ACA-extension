/* eslint-disable license-header/header */
import { RuleContext } from '@alfresco/adf-extensions';

/**
 * Checks if the current route is the dossier view.
 * JSON ref: `ext.isDossier`
 */
export function isDossier(context: RuleContext): boolean {
  const url = context.navigation?.url || '';
  const currentNode = context.navigation?.currentFolder;
  // Verifica que la URL comience con /intranet y contenga /details
  const isIntranetDetails = url.startsWith('/intranet') && url.includes('/details');
  // Verifica que el nodo actual sea una carpeta
  const isFolder = currentNode?.isFolder === true;
  return isIntranetDetails && isFolder;
}
/**
 * Verifica si hay un nodo seleccionado y si tiene permisos de creación o actualización.
 * Generalizado para cualquier contexto, no solo para la vista de dossier.
 * JSON ref: `ext.canCreateInCurrentFolder`
 */
export function canCreateInCurrentFolder(context: RuleContext): boolean {
  const currentFolder = context.navigation?.currentFolder;
  if (currentFolder) {
    const allowableOps = currentFolder.allowableOperations || [];
    return allowableOps.includes('create') || allowableOps.includes('update');
  }
  return false;
}
/**
 * Verifica si la ruta actual pertenece a la sección de intranet y no es una vista de detalles.
 * JSON ref: `ext.isIntranetDocumentLibrary`
 */
export function isIntranetDocumentLibrary(context: RuleContext): boolean {
  const url = context.navigation?.url || '';
  const pathElements = context.navigation?.currentFolder?.path?.elements || [];

  return url.startsWith('/intranet') && pathElements.slice(-1)[0]?.name === 'documentLibrary';
}
/**
 * Verifica si la ruta actual pertenece a la intranet.
 * JSON ref: `ext.isIntranet`
 */
export function isIntranet(context: RuleContext): boolean {
  const url = context.navigation?.url || '';
  return url.startsWith('/intranet');
}
/**
 * Verifica si la ruta actual no sea /intranet/search.
 * JSON ref: `ext.isIntranetSearch`
 */
export function isIntranetSearch(context: RuleContext): boolean {
  const url = context.navigation?.url || '';
  return url.startsWith('/intranet/search');
}

/**
 * DEBUG FUNCTION: Logs all RuleContext properties to console.
 * Use this temporarily to explore what data is available.
 * JSON ref: `ext.debugContext`
 */
export function debugContext(context: RuleContext): boolean {
  console.group('🔍 RuleContext Debug');

  // eslint-disable-next-line no-console
  console.log('📍 Navigation:', {
    url: context.navigation?.url,
    currentFolder: context.navigation?.currentFolder
  });

  // eslint-disable-next-line no-console
  console.log('✅ Selection:', {
    isEmpty: context.selection?.isEmpty,
    count: context.selection?.count,
    first: context.selection?.first,
    nodes: context.selection?.nodes
  });
  // eslint-disable-next-line no-console
  console.log('👤 Profile:', {
    id: context.profile?.id,
    firstName: context.profile?.firstName,
    lastName: context.profile?.lastName,
    email: context.profile?.email,
    groups: context.profile?.groups
  });

  // eslint-disable-next-line no-console
  console.log('🔐 Auth:', context.auth);

  // eslint-disable-next-line no-console
  console.log('📦 Repository:', {
    edition: context.repository?.edition,
    version: context.repository?.version
  });
  // eslint-disable-next-line no-console
  console.log('🔑 Permissions:', context.permissions);

  console.groupEnd();

  return true; // Always return true to make it visible
}
