import { Route } from '@factoryplus/core';
import { RouterReducerState } from '@ngrx/router-store';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreRouterState, coreRouterStateKey, routerStoreStateKey } from '../states/core-router.state';

/**
 * @ignore
 */
export const selectCoreRouterState =
  createFeatureSelector<CoreRouterState>(coreRouterStateKey);

/** get visited routes from state */
export const getRoutes = createSelector(
  selectCoreRouterState,
  (state: CoreRouterState) => state.routes
);

/** get current index for current visited route */
export const getCurretIndex = createSelector(
  selectCoreRouterState,
  (state: CoreRouterState) => state.currentIndex
);

/**
 * @ignore
 */
export const selectRouterStoreState =
  createFeatureSelector<RouterReducerState<Route>>(routerStoreStateKey);

/** get active route state */
export const getActiveRouteState = createSelector(
  selectRouterStoreState,
  (state: RouterReducerState<Route>) => state.state
);

/** get active route url */
export const getActiveRoute = createSelector(
  selectRouterStoreState,
  (state: RouterReducerState<Route>) => state?.state?.url || ''
);
