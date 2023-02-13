import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription, Unsubscribable, Observable } from 'rxjs';

/**
 * This class acts as a base component for all project components
 */
@Component({
  template: ``,
})
export abstract class BaseComponent implements OnDestroy {
  /** Component loading */
  loading$!: Observable<boolean>;

  /**
   * It is used when we want to dispose of the subscription after the Observables
   * emits value or gets completed
   */
  private destroy$ = new Subject<void>();
  /**
   * It is used when we want to register subscriptions to dispose them by unsubscribing
   * in component ngOnDestroy
   */
  private subscriptions$ = new Subscription();

  /**
   * It is used when we want to dispose of the subscription after the Observables
   * emits value or gets completed
   * @example
   * this.api.GetList().pipe(takeUntil(this.destory)).subscribe(res => { this.variableName = res; });
   */
  get destroy() {
    return this.destroy$;
  }

  /**
   * set subscription to register it
   * @example
   * this.subscription = this.api.GetList().subscribe(res => { this.variableName = res; });
   */
  protected set subscription(observable: Unsubscribable) {
    this.subscriptions$.add(observable);
  }

  /**
   * Action required to do on disposing a component
   */
  ngOnDestroy() {
    // complete the observable to dispose attached subscriptions
    this.destroy$.next();
    this.destroy$.complete();

    // Unsubscribe all subscriptions registered in the subscriptions variable
    this.subscriptions$.unsubscribe();
  }
}
