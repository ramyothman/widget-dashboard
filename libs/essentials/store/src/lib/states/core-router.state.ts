import { Route } from '@factoryplus/core';
/** Application State Key */
export const coreRouterStateKey = 'router';
/** Router Store from the NgRx Router Store */
export const routerStoreStateKey = 'routerStore';
/** CoreRouterState Interface */
export interface CoreRouterState {
  /** list of routes that have been visited */
  routes: Route[];
  /** current index for current root */
  currentIndex: number;
}

/** Core Router Initial State */
export const coreRouterInitialState: CoreRouterState = {
  routes: [],
  currentIndex: -1,
};
