import { Route, Logger } from '@factoryplus/core';
import { CoreRouterState } from '../states/core-router.state';
import * as ApplicationReducer from './application.reducer';
import * as CoreRouterReducer from './router.reducer';

import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';

import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { ApplicationState } from '../states/application.state';
import * as CoreRouterActions from '../actions/router.action';


/**
 * NgRxLogger to be used in logging Actions
 */
export const NgRxLogger = new Logger('StoreActionLogger');

/**
 * State Interface
 */
export interface State {
  /** Application State */
  application: ApplicationState;
  /** Router State */
  router: CoreRouterState;
  /** Router Store State */
  routerStore: RouterReducerState<Route>;
}

/**
 * @ignore
 * reducer map for initialization
 */
export const reducers: ActionReducerMap<State> = {
  application: ApplicationReducer.reducer,
  router: CoreRouterReducer.reducer,
  routerStore: routerReducer,
};

/**
 * log all actions
 * @param {ActionReducer<State>} reducer fired action to be logged
 */
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    NgRxLogger.groupCollapsed(`[${NgRxLogger.source}] - ${action.type}`);
    NgRxLogger.info('prev state', state);
    NgRxLogger.info('action', action);
    NgRxLogger.info('next state', result);
    NgRxLogger.groupEnd();

    return result;
  };
}

/**
 * Meta Reducer
 */
export const metaReducers: MetaReducer<State>[] = [];
// isDevMode()
//  ? [logger, storeFreeze]
//  : [];
