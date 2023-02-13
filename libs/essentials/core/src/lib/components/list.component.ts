import { BaseComponent } from './base.component';

/**
 * This class acts as a base component for all components that include lists
 */
export class ListComponent extends BaseComponent {
  /**
   * Used in the template along side the *ngFor directive
   * Without trackBy the angular application will remove all the DOM elements
   * and then recreate the DOM elements again.
   * So using it will allow angular to Track which items have been added or removed
   * according to the unique identifier to create or destroy only the items that changed
   * @param {number} index List Index
   * @param {any} entity List Entity
   * @example
   * <tr *ngFor='let item of items; trackBy:trackByFn'>
   */
  trackByFn(index: number, entity: any) {
    return entity.id;
  }
}
