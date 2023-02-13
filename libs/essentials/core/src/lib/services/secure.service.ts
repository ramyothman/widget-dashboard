import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

/**
 * Security Service for Encryption & Decryption
 */
@Injectable({
  providedIn: 'root',
})
export class SecureService {
  /**
   * Security Key - 256 Random Key
   * @ignore
   */
  secretKey = 'NcRmUjXn2b5u8x!A%D*G-RaPdSgVkYp3';
  /**
   * Ecrypt string using AES Algorithm
   * @param {string} value value - string to be encrypted
   */
  encrypt(value: string): string {
    return AES.encrypt(value, this.secretKey).toString();
  }

  /**
   * Decrypt string using AES Algorithm
   * @param {string} value value - string to be decrypted
   */
  decrypt(value: string): string {
    return AES.decrypt(value, this.secretKey).toString(enc.Utf8);
  }
}
