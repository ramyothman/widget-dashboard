import { Data, Params } from '@angular/router';
/**
 * Route Interface
 */
export interface Route {
  /** route url */
  url: string;
  /** route query params */
  queryParams?: Params;
  /** route params */
  params?: Params;
  /** route data */
  data?: Data;
}
