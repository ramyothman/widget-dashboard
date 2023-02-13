import { SerializationError } from './utils/storage-exceptions';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { IStorageService } from './interfaces/istorage-service';
import { SecureService } from '../secure.service';

/**
 * Local Storage Service - Managing localStorage functionality
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements IStorageService {
  /** @ignore */
  constructor(private secureService: SecureService) { }
  /**
   * Store item in localStorage with the provided key
   * @param key key for item to store
   * @param data data to be stored
   */
  public store(key: string, data: any, secured?: boolean): void {
    let serializedData: string = null as any;
    /* Check if data can be serialized */
    const dataPrototype: unknown = Object.getPrototypeOf(data);
    if (
      typeof data === 'object' &&
      data !== null &&
      !Array.isArray(data) &&
      !(dataPrototype === Object.prototype || dataPrototype === null)
    ) {
      throwError(new SerializationError());
    }

    /* Try to stringify (can fail on circular references) */
    try {
      serializedData = JSON.stringify(data);
      if (secured) {
        this.secureService.encrypt(serializedData);
      }
    } catch (error) {
      throwError(error as TypeError);
    }

    /* Can fail if storage quota is exceeded */
    try {
      localStorage.setItem(key, serializedData);
    } catch (error) {
      throwError(error as DOMException);
    }
  }

  /**
   * Retreive Item by Key
   * @param {string} key key for item to be restored
   */
  public retrieve<T>(key: string, secured?: boolean): T {
    /* Get raw data */
    let unparsedData = localStorage.getItem(key);
    let parsedData: T = null as any;

    /* No need to parse if data is `null` or `undefined` */
    if (unparsedData !== undefined && unparsedData !== null) {
      /* Try to parse */
      try {
        if (secured) {
          unparsedData = this.secureService.decrypt(unparsedData);
        }
        parsedData = JSON.parse(unparsedData);
      } catch (error) {
        throwError(error as SyntaxError);
      }
    }
    return parsedData;
  }

  /**
   * Remove Item from storage by key
   * @param key key for item to be removed
   */
  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * clear storage
   */
  public clear() {
    localStorage.clear();
  }
}
