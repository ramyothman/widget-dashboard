import { Confirmation, Notification } from '@factoryplus/core';
import { createAction, props } from '@ngrx/store';
/** Application Actions Constants */
export const APPLICATION_ACTIONS = {
  ADD_NOTIFICATION: '[Application] Add Notification',
  DISMISS_NOTIFICATION: '[Application] Dismiss Notification',
  COMPLETE: '[Application] Complete',
  APPLICATION_FAIL: '[Application] Application Fail',
  APPLICATION_COMPLETE: '[Application] Application Complete',
  TOGGLE_MENU: '[Application] Toggle Left Menu',
};


/** Add Alert Action */
export const addNotification = createAction(
  APPLICATION_ACTIONS.ADD_NOTIFICATION,
  props<{
    notification: Notification;
  }>()
);

/** Dismiss Alert Action */
export const dismissNotification = createAction(
  APPLICATION_ACTIONS.DISMISS_NOTIFICATION,
  props<{
    payload: string;
  }>()
);

/** Application Fail */
export const applicationFail = createAction(
  APPLICATION_ACTIONS.APPLICATION_FAIL,
  props<{
    payload: any;
  }>()
);

export const applicationComplete = createAction(
  APPLICATION_ACTIONS.APPLICATION_COMPLETE
);

export const toggleMenu = createAction(
  APPLICATION_ACTIONS.TOGGLE_MENU,
  props<{
    show: boolean;
  }>()
);