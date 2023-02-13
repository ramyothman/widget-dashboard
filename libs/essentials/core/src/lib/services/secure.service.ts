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

  getData() {
    const data = [];
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2023-12-31');
    const range =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    for (let i = 0; i <= range; i++) {
      const date = new Date(startDate.getTime() + i * (1000 * 3600 * 24));
      const month = date.getMonth();
      const day = date.getDate();

      if (day >= 5 && day <= 10) {
        data.push({
          Time: date.toISOString().substring(0, 10),
          Price: Math.floor(Math.random() * 100),
        });
      }
    }
    return data;
  }

  groupByMonth(data: any[]) {
    const months: any = {};
    data.forEach(item => {
      const month = item.Time.substr(0, 7);
      if (!months[month]) {
        months[month] = { Time: month, Price: 0 };
      }
      months[month].Price += item.Price;
    });
    return Object.values(months);
  }

  groupByQuarter(data: any[]) {
    const quarters: any = {};
    data.forEach((item) => {
      const year = item.Time.substr(0, 4);
      const quarter = Math.floor((new Date(item.Time).getMonth() + 3) / 3);
      const quarterKey = year + '-' + 'Q' + quarter;
      if (!quarters[quarterKey]) {
        quarters[quarterKey] = { Time: quarterKey, Price: 0 };
      }
      quarters[quarterKey].Price += item.Price;
    });
    return Object.values(quarters);
  }

  groupByYear(data: any[]) {
    const years: any = {};
    data.forEach(item => {
    const year = item.Time.substr(0, 4);
    if (!years[year]) {
    years[year] = { Time: year, Price: 0 };
    }
    years[year].Price += item.Price;
    });
    return Object.values(years);
    }

    groupByDay(data: any[]) {
      const days: any = {};
      data.forEach(item => {
        const day = item.Time.substr(0, 10);
        if (!days[day]) {
          days[day] = { Time: day, Price: 0 };
        }
        days[day].Price += item.Price;
      });
      return Object.values(days);
    }
}
