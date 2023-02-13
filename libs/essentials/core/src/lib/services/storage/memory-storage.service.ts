import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { IStorageService } from './interfaces/istorage-service';
import { SecureService } from '../secure.service';

/**
 * Memory Storage Service - Managing Memory Storage functionality
 */
@Injectable({
  providedIn: 'root',
})
export class MemoryStorageService implements IStorageService {
  /** Memory Storage */
  protected memoryStorage = new Map<string, unknown>();

  /** @ignore */
  constructor(private secureService: SecureService) { }

  /**
   * Store item in sessionStorage with the provided key
   * @param key key for item to store
   * @param data item to be stored
   */
  public store(key: string, data: any, secured?: boolean): void {
    let item = data;
    try {
      if (secured) {
        item = this.secureService.encrypt(JSON.stringify(data));
      }
    } catch (error) {
      throwError(error);
    }
    this.memoryStorage.set(key, item);
  }

  /**
   * Retreive Item by Key
   * @param {string} key key for item to be restored
   */
  public retrieve<T>(key: string, secured?: boolean): T {
    let item = this.memoryStorage.get(key);
    try {
      if (secured) {
        item = JSON.parse(this.secureService.decrypt(item as string));
      }
    } catch (error) {
      throwError(error);
    }
    return item as T;
  }

  /**
   * Remove Item from storage by key
   * @param key key for item to be removed
   */
  public remove(key: string): void {
    this.memoryStorage.delete(key);
  }

  /**
   * clear storage
   */
  public clear() {
    this.memoryStorage.clear();
  }
}
