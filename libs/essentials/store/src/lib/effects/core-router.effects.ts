import { ApplicationActions } from '../../index';
import { Route } from '@factoryplus/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { of } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CoreRouterActions, CoreRouterSelectors, AppStore } from '../..';

/**
 * Core Router Effects
 */
@Injectable()
export class CoreRouterEffects {
  /**
   * navigate to path
   */
  navigate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreRouterActions.Navigate),
      map((action: any) => action.payload),
      switchMap((action) => {
        this.router.navigate(action.path, action.query);
        return of(ApplicationActions.applicationComplete());
      })
    );
  });

  /**
   * register path
   */
  navigationAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      switchMap((action: any) => {
        const params: Route = {
          ...action.payload.routerState,
        };
        return of(CoreRouterActions.RegisterNavigation({ payload: params }));
      })
    );
  });

  /**
   * Navigate Back to the previous opened page from the app
   */
  navigateBack$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreRouterActions.NavigateBack),
      withLatestFrom(
        this.store.select(CoreRouterSelectors.getRoutes),
        this.store.select(CoreRouterSelectors.getCurretIndex)
      ),
      switchMap(([action, routes, index]) => {
        if (routes) {
          this.router.navigate([routes[index as any]?.url], routes[index as any]?.params);
          return of(CoreRouterActions.NavigateBackSuccess());
        }
        // this.store.dispatch(CoreRouterActions.NavigateBackFail());
        return of(CoreRouterActions.NavigateBackFail());
      })
    );
  });

  /**
   * Navigate forward
   */
  navigateForward$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreRouterActions.NavigateForward),
      withLatestFrom(
        this.store.select(CoreRouterSelectors.getRoutes),
        this.store.select(CoreRouterSelectors.getCurretIndex)
      ),
      switchMap(([action, routes, index]) => {
        if (routes) {
          this.router.navigate([routes[index as any]?.url], routes[index as any]?.params);
          return of(CoreRouterActions.NavigateForwardSuccess());
        }
        // this.store.dispatch(CoreRouterActions.NavigateBackFail());
        return of(CoreRouterActions.NavigateForwardFail());
      })
    );
  });

  /** @ignore */
  constructor(
    private actions$: Actions,
    private router: Router,
    private store: AppStore
  ) { }
}
