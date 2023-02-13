import { applicationKey } from './../states/application.state';
import { ApplicationState } from '../..';
import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * @ignore
 */
export const selectApplicationState =
  createFeatureSelector<ApplicationState>(applicationKey);
/** Get Notifications Alerts from State */
export const getNotifications = createSelector(
  selectApplicationState,
  (state: ApplicationState) => state.notifications || []
);

/** Check for loading state */
export const isLoading = createSelector(
  selectApplicationState,
  (state: ApplicationState) => state.loading
);

/** Check for menu state */
export const isOpenMenu = createSelector(
  selectApplicationState,
  (state: ApplicationState) => state.openMenu
);

