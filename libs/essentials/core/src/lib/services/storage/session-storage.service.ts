import { Injectable } from '@angular/core';
import { SecureService } from '../secure.service';
import { IStorageService } from './interfaces/istorage-service';

/**
 * Session Storage Service - Managing sessionStorage functionality
 */
@Injectable({
  providedIn: 'root',
})
export class SessionStorageService implements IStorageService {
  /** @ignore */
  constructor(private secureService: SecureService) { }
  /**
   * Store item in sessionStorage with the provided key
   * @param key key for item to store
   * @param data item to be stored
   */
  public store(key: string, data: any, secured?: boolean): void {
    let item = JSON.stringify(data);
    if (secured) {
      item = this.secureService.encrypt(item);
    }
    sessionStorage.setItem(key, item);
  }

  /**
   * Retreive Item by Key
   * @param {string} key key for item to be restored
   */
  public retrieve<T>(key: string, secured?: boolean): T {
    let stringifiedItem = sessionStorage.getItem(key);
    if (secured && stringifiedItem && stringifiedItem.length > 0) {
      stringifiedItem = this.secureService.decrypt(stringifiedItem);
    }
    if (stringifiedItem == null || stringifiedItem === '') {
      return null as any;
    }

    return JSON.parse(stringifiedItem) as T;
  }

  /**
   * Remove Item from storage by key
   * @param key key for item to be removed
   */
  public remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * clear storage
   */
  public clear() {
    sessionStorage.clear();
  }
}
