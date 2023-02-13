import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Confirmation } from '../models';

/**
 * ConfirmationService triggers the cofirm for a confirmation modal
 */
@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  /** Contain the Confirmation Object */
  private requireConfirmationSource = new Subject<Confirmation>();
  /** Observable monitoring the requireConfirmationSource */
  requireConfirmation$ = this.requireConfirmationSource.asObservable();

  /**
   * @ignore
   * @param translateService
   */
  constructor(
    private translateService: TranslateService
  ) { }

  /**
   * triggers the requireConfirmation$ to trigger the default confirmation modal
   * @param {Confirmation} confirmation the confirmation object
   */
  confirm(confirmation: Confirmation) {
    // this.appStore.dispatch(ApplicationActions.addConfirmation({ confirmation }));
    this.requireConfirmationSource.next(confirmation);
    return this;
  }
}
