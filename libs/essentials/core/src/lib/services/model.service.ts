import { Injectable } from '@angular/core';
import { clone, cloneDeep, isEqual, isMatch } from 'lodash-es';

/**
 * ModelService helper for miscellenous functions on the model
 * i.e. {clone, }
 */
@Injectable({
  providedIn: 'root',
})
export class ModelService {
  /** original model record */
  private _originalItem!: any;
  /** current model record */
  public _currentItem!: any;

  /**
   * @description
   * set item
   *
   * @param item item to be set
   */
  public set(item: any) {
    this._originalItem = this.cloneDeep(item);
    this._currentItem = item;
  }

  /**
   * @description
   * set item when changed
   *
   * @param item item to be set
   */
  public setOnOriginalChange(item: any, key: string) {
    if (item[key] !== undefined) {
      if (!this._originalItem || this._originalItem[key] !== item[key]) {
        this._originalItem = this.cloneDeep(item);
      }
    }
    this._currentItem = item;
  }

  /**
   * get current Item Data
   */
  public get CurrentItem(): any {
    return this._currentItem;
  }

  /**
   * set model data
   * @param {any} item item to be set
   */
  public set CurrentItem(item: any) {
    this._currentItem = item;
  }

  /**
   * set Original Item data
   */
  public set OriginalItem(item: any) {
    this._originalItem = item;
  }

  /**
   * get Original Item data
   */
  public get OriginalItem(): any {
    return this._originalItem;
  }

  /**
   * restore the original item helps in cancelling the changes on an object
   */
  public restoreItem(): any {
    this.CurrentItem = this.cloneDeep(this.OriginalItem);
    return this.CurrentItem();
  }

  /**
   * Compare the original and current items to know if values have been changed
   */
  public isChanged(): boolean {
    return !isEqual(this.OriginalItem, this.CurrentItem);
  }

  isModelsEqual(orig: any, copied: any) {
    return isEqual(orig, copied);
  }

  /**
   * Check if one object is part of another object
   */
  isModelsMatch(orig: any, copied: any) {
    return isMatch(copied, orig) && Object.keys(orig).length !== 0;
  }

  /**** Helper Methods */

  /**
   * Clone Deep object and nested properties
   * @param {any} item item to be cloned
   */
  public cloneDeep(item: any): any {
    return cloneDeep<any>(item);
  }

  /**
   * Clone object
   * @param {any} item item to be cloned
   */
  public clone(item: any): any {
    return clone<any>(item);
  }

  // public mapObject<T>(
  //   source: any,
  //   ctorT: NoParamConstructor<T>,
  //   mapBasic: boolean = false
  // ) {
  //   // console.log(props);
  //   const result = new ctorT();
  //   const sourceData = this.cloneDeep(source);
  //   const resultMetaData = Object.getOwnPropertyNames(result);
  //   const sourceMetaData = Object.getOwnPropertyNames(sourceData);
  //   // Map Similar Names
  //   for (const key of resultMetaData) {
  //     if (sourceData[key]) {
  //       result[key] = Array.isArray(sourceData[key])
  //         ? [...sourceData[key]]
  //         : this.isObject(sourceData[key])
  //         ? this.cloneDeep(sourceData[key])
  //         : sourceData[key];
  //     }
  //   }

  //   if (!mapBasic) {
  //     // TODO Add Custom Mapping

  //     // extra keys
  //     for (const key of sourceMetaData) {
  //       if (!resultMetaData.includes(key)) {
  //         result[key] = Array.isArray(sourceData[key])
  //           ? [...sourceData[key]]
  //           : this.isObject(sourceData[key])
  //           ? this.cloneDeep(sourceData[key])
  //           : sourceData[key];
  //       }
  //     }
  //   }
  //   return result;
  // }

  isObject(val: any): boolean {
    if (val === null) {
      return false;
    }
    return typeof val === 'object';
  }
}

export type NoParamConstructor<T> = new () => T;
