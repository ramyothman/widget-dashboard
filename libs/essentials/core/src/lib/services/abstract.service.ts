import { HttpClient } from '@angular/common/http';

/**
 * Base Service for all api services
 */
export abstract class AbstractService {
  /**
   * The API Url
   */
  protected api = '';

  /** @ignore */
  constructor(protected http: HttpClient) { }

  /** abstract uri property for setting the requested api uri folder/reference */
  abstract get uri(): string;

  /**
   * get Full Url Path
   * @param {string} uri get the full API url
   */
  getUrl(uri: string): string {
    if (this.uri && this.uri.length > 0) {
      return `${this.api}/${this.uri}/${uri}`;
    } else {
      return `${this.api}/${uri}`;
    }
  }

  /**
   * Get Method
   * @param {string} uri the service method uri to be executed
   * @param {any} header additional headers for the request
   */
  get(uri: string = '', header: any = { }) {
    const url = this.getUrl(uri);
    return this.http.get(url, header);
  }

  /**
   * Post Method
   * @param {string} uri the service method uri to be executed
   * @param {any}  data post data
   */
  post(uri: string, data = { }) {
    const url = this.getUrl(uri);
    return this.http.post(url, data);
  }

  /**
   * Put Method
   * @param {string} uri the service method uri to be executed
   * @param {any}  data put data
   */
  put(uri: string, data: any) {
    const url = this.getUrl(uri);
    return this.http.put(url, data);
  }

  /**
   * Delete Method
   * @param {string} uri the service method uri to be executed
   * @param {any}  data post data
   */
  delete(uri: string, data: any) {
    const url = this.getUrl(uri);
    return this.http.delete(url + '/' + data);
  }
}
