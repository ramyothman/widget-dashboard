/**
 * Service for Storage Enumeration
 */
export interface IStorageService {
  /**
   * Stored Data in storage
   * @param {string} key key for data to be stored
   * @param {any} data data to be stored
   * @param {boolean} secured mark data for encryption before storage
   */
  store(key: string, data: any, secured?: boolean): void;

  /**
   * Retrieve data from storage
   * @param {string} key key for data to be retrieved
   * @param secured mark data for decryption before retrieval
   */
  retrieve<T>(key: string, secured?: boolean): T;

  /**
   * Remove data from storage
   * @param key key for data to be removed
   */
  remove(key: string): void;

  /**
   * Clear Storage
   */
  clear(): void;
}
