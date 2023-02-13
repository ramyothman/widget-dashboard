import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { NotificationService } from '@factoryplus/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap } from 'rxjs';
import {
  ApplicationActions,
} from '../..';

/**
 * Application Effects
 */
@Injectable()
export class ApplicationEffects {

    /**
   * application fail
   */
     applicationFail$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ApplicationActions.applicationFail),
        map((action: any) => action.payload),
        switchMap((action) => {
          this.notificationService.error('Error', action);
          return of(ApplicationActions.applicationComplete());
        })
      );
    });

  /**
   * @ignore
   * @param actions$
   */
  constructor(
    private actions$: Actions,
    @Inject(LOCALE_ID) public localeID: string,
    private notificationService: NotificationService
  ) { }
}
