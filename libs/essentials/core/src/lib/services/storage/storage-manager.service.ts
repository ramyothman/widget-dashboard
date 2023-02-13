import { CookieOptions } from 'ngx-cookie';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { LocalStorageService } from './local-storage.service';
import { MemoryStorageService } from './memory-storage.service';
import { CookieStorageService } from './cookies-storage.service';
import { StorageType } from './utils/storage-type';


/**
 * Storage Manager Service - Managing storage functionality
 * Default Storage & Secure Storage are defaulted to MemoryStorageService
 */
@Injectable({
  providedIn: 'root',
})
export class StorageManagerService {
  /** @ignore */
  constructor(
    private sessionStorage: SessionStorageService,
    private localStorage: LocalStorageService,
    private memoryStorage: MemoryStorageService,
    private cookieStorage: CookieStorageService
  ) { }
  /**
   * Store item in sessionStorage with the provided key
   * Default Storage & Secure Storage are set to memory storage
   * @param key key for item to store
   * @param item item to be stored
   */
  public store(
    key: string,
    item: any,
    storageType?: StorageType,
    secured?: boolean,
    cookieOptions?: CookieOptions
  ): void {
    switch (storageType) {
      case StorageType.LocalStorage:
        this.localStorage.store(key, item, secured);
        break;
      case StorageType.MemoryStorage:
        this.memoryStorage.store(key, item, secured);
        break;
      case StorageType.SessionStorage:
        this.sessionStorage.store(key, item, secured);
        break;
      case StorageType.CookieStorage:
        this.cookieStorage.store(key, item, secured, cookieOptions);
        break;
      case StorageType.SecureStorage:
        this.memoryStorage.store(key, item, true);
        break;
      default:
        this.memoryStorage.store(key, item, secured);
        break;
    }
  }

  /**
   * Retreive Item by Key
   * Default Storage & Secure Storage are set to memory storage
   * @param {string} key key for item to be restored
   */
  public retrieve<T>(
    key: string,
    storageType?: StorageType,
    secured?: boolean
  ): T {
    let parsedData: T = null as any;
    switch (storageType) {
      case StorageType.LocalStorage:
        parsedData = this.localStorage.retrieve<T>(key, secured);
        break;
      case StorageType.MemoryStorage:
        parsedData = this.memoryStorage.retrieve<T>(key, secured);
        break;
      case StorageType.SessionStorage:
        parsedData = this.sessionStorage.retrieve<T>(key, secured);
        break;
      case StorageType.CookieStorage:
        parsedData = this.cookieStorage.retrieve<T>(key, secured);
        break;
      case StorageType.SecureStorage:
        parsedData = this.memoryStorage.retrieve<T>(key, true);
        break;
      default:
        parsedData = this.memoryStorage.retrieve<T>(key, secured);
        break;
    }
    return parsedData;
  }

  /**
   * Remove Item from storage by key
   * removing a key from Default Storage OR SecureStorage will remove it from the memory storage
   * @param key key for item to be removed
   */
  public remove(key: string, storageType?: StorageType): void {
    switch (storageType) {
      case StorageType.LocalStorage:
        this.localStorage.remove(key);
        break;
      case StorageType.MemoryStorage:
        this.memoryStorage.remove(key);
        break;
      case StorageType.SessionStorage:
        this.sessionStorage.remove(key);
        break;
      case StorageType.CookieStorage:
        this.cookieStorage.remove(key);
        break;
      case StorageType.SecureStorage:
        this.memoryStorage.remove(key);
        break;
      default:
        this.memoryStorage.remove(key);
        break;
    }
  }

  /**
   * Clear storage
   * Clearing Default Storage OR SecureStorage will clear the memory storage
   */
  public clear(storageType?: StorageType) {
    switch (storageType) {
      case StorageType.LocalStorage:
        this.localStorage.clear();
        break;
      case StorageType.MemoryStorage:
        this.memoryStorage.clear();
        break;
      case StorageType.SessionStorage:
        this.sessionStorage.clear();
        break;
      case StorageType.CookieStorage:
        this.cookieStorage.clear();
        break;
      case StorageType.SecureStorage:
        this.memoryStorage.clear();
        break;
      default:
        this.memoryStorage.clear();
        break;
    }
  }
}
