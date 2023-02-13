import { Notification } from '@factoryplus/core';
/**
 * Application State Key
 */
export const applicationKey = 'application';

/**
 * ApplicationState Interface
 */
export interface ApplicationState {
  /** application loading */
  loading: boolean;
  /** notification alerts */
  notifications: Notification[];
  /** Show Complete left menu */
  openMenu: boolean;
}

/** Application Initial State */
export const applicationInitialState: ApplicationState = {
  loading: false,
  notifications: [],
  openMenu: true
};
