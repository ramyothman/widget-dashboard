import { NavigationExtras } from '@angular/router';

/**
 * Router Payload
 */
export interface RouterPayload {
  /** Path to navigate to */
  path: string[];
  /** query for navigation */
  query?: NavigationExtras;
}
