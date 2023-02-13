import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ConfirmationService } from '../confirmation.service';

/**
 * Interface for the canDeactivate method from the CanDeactivate Interface Guard
 */
export interface CanComponentDeactivate {
  /**
   * canDeactivate method with signature like the CanDeactivate Interface Guard
   */
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}

/**
 * CanDeactivateGuard places a guard on components to check if you can navigate outside
 */
@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  /**
   * Constructor for the CanDeactivateGuard
   * @param {ConfirmationService} confirmationService confirmation service
   * @param {TranslateService} translateService translation service
   */
  constructor(
    private confirmationService: ConfirmationService,
    private translateService: TranslateService
  ) { }
  /**
   * Method for checking if it's possible to deactivate the page if not triggers a confirmation dialog
   * @param {CanComponentDeactivate} component a component that implements the CanComponentDeactivate interface
   */
  canDeactivate(component: any) {
    // Allow navigation if the form is unchanged
    if (typeof component.canDeactivate === undefined) {
      return true;
    }
    if (component.canDeactivate() === true) {
      return true;
    }
    return this.canDeactivateConfirmation(component);
  }

  /**
   * Trigger the confirm dialog until acceptance or rejection
   */
  canDeactivateConfirmation(component: any): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      const message = this.translateService.instant(
        'General.DiscardChangesQuestionMessage'
      );
      this.confirmationService.confirm({
        message,
        accept: () => {
          if (typeof component.submit !== undefined) {
            component.submit();
          }
          observer.next(true);
          observer.complete();
        },
        reject: () => {
          observer.next(false);
          observer.complete();
        },
        discard: () => {
          observer.next(true);
          observer.complete();
        },
      });
    });
  }
}
