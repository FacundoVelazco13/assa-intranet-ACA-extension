/* eslint-disable license-header/header */
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Node } from '@alfresco/js-api';
import { getNameByTypeCode } from '../../../utils/content-types.utils';
import { getPropertiesByType, getStandardProperties } from '../../../utils/properties.utils';

export interface PropertyConfig {
  key: string;
  label: string;
  icon?: string;
  defaultValue?: string;
  formatter?: (value: any) => string;
  isNodeProperty?: boolean;
}

@Component({
  selector: 'aca-dossier-info',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatIconModule],
  templateUrl: './dossier-info.component.html',
  styleUrls: ['./dossier-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DossierInfoComponent implements OnInit {
  @Input() node: Node;
  properties: PropertyConfig[] = [];

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('DossierInfoComponent initialized with node:', this.node.properties);
    this.properties.push(...getStandardProperties());
    this.properties.push(...getPropertiesByType(this.node.nodeType));
  }

  get typeName(): string {
    return getNameByTypeCode(this.node?.nodeType);
  }

  getPropertyValue(property: PropertyConfig): string {
    if (!this.node) {
      return property.defaultValue || '-';
    }

    let value: any;

    // Si es propiedad directa del nodo (createdAt, modifiedAt, createdByUser, etc.)
    if (property.isNodeProperty) {
      // Manejo especial para propiedades anidadas como createdByUser.displayName
      const keys = property.key.split('.');
      value = keys.reduce((obj, key) => obj?.[key], this.node);
    } else {
      // Propiedades dentro de node.properties (cm:description, cm:title, etc.)
      value = this.node.properties?.[property.key];
    }

    if (value === null || value === undefined || value === '') {
      return property.defaultValue;
    }

    if (property.formatter) {
      return property.formatter(value);
    }

    if (Array.isArray(value)) {
      return value.join(', ');
    }

    return String(value);
  }
}
