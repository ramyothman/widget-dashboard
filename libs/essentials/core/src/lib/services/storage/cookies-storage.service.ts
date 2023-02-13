import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { IStorageService } from './interfaces/istorage-service';
import { SecureService } from '../secure.service';
/**
 * Cookie Storage Service - Managing Cookie Storage functionality
 */
@Injectable({
  providedIn: 'root',
})
export class CookieStorageService implements IStorageService {
  /** Cached cookie */
  protected cachedCookieString = '';
  /** Memory Storage */
  protected cachedItemsMap = new Map<string, string>();

  /** @ignore */
  constructor(
    private secureService: SecureService,
    private cookieService: CookieService
  ) { }

  /**
   * Store item in cookieStorage with the provided key
   * @param key key for item to store
   * @param data item to be stored
   */
  public store(
    key: string,
    data: any,
    secured?: boolean,
    cookieOptions?: CookieOptions
  ): void {
    if (typeof document === 'undefined') {
      return;
    }
    let serializedData: string = null as any;
    try {
      serializedData = JSON.stringify(data);
      if (secured) {
        this.secureService.encrypt(serializedData);
      }
    } catch (error) {
      throwError(error as TypeError);
    }
    /* Try to stringify (can fail on circular references) */
    /* Can fail if storage quota is exceeded */
    try {
      this.cookieService.put(key, serializedData, cookieOptions);
    } catch (error) {
      throwError(error as DOMException);
    }
  }

  /**
   * Retreive Item by Key
   * @param {string} key key for item to be restored
   */
  public retrieve<T>(key: string, secured?: boolean): T {
    const item = this.cookieService.get(key);
    let deSerializedObject: T = null as any;
    try {
      if (secured) {
        deSerializedObject = JSON.parse(
          this.secureService.decrypt(item as string)
        );
      }
    } catch (error) {
      throwError(error);
    }
    return deSerializedObject as T;
  }

  /**
   * Remove Item from storage by key
   * @param key key for item to be removed
   */
  public remove(key: string): void {
    this.cookieService.remove(key);
  }

  /**
   * clear storage
   */
  public clear() {
    this.cookieService.removeAll();
  }
}
