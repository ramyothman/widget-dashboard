/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    coreRouterInitialState,
    CoreRouterState,
  } from '../states/core-router.state';
  import { createReducer, on } from '@ngrx/store';
  import * as CoreRouterActions from '../actions/router.action';
  /**
   * @ignore
   */
  export const reducer = createReducer(
    coreRouterInitialState,
    on(
      CoreRouterActions.RegisterNavigation,
      (state: CoreRouterState, action) => ({
        ...state,
        routes: [...state.routes, { ...action.payload }],
        currentIndex: state.currentIndex + 1,
      })
    ),
    on(CoreRouterActions.NavigateBack, (state: CoreRouterState, action) => ({
      ...state,
      currentIndex: state.currentIndex < 0 ? -1 : state.currentIndex - 1,
    })),
    on(CoreRouterActions.NavigateForward, (state: CoreRouterState, action) => ({
      ...state,
      currentIndex:
        state.currentIndex > state.routes.length - 1
          ? state.currentIndex
          : state.currentIndex + 1,
    }))
  );
  