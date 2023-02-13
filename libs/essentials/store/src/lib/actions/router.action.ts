import { Route, RouterPayload } from '@factoryplus/core';
import { createAction, props } from '@ngrx/store';

/** Router Actions Constants */
export const ROUTER_ACTIONS = {
  NAVIGATE: '[ROUTER] Navigate',
  NAVIGATE_BACK: '[ROUTER] Navigate Back',
  NAVIGATE_BACK_SUCCESS: '[ROUTER] Navigate Back Sucess',
  NAVIGATE_BACK_FAIL: '[ROUTER] Navigate Back Failed',
  NAVIGATE_FORWARD: '[ROUTER] Navigate Forward',
  NAVIGATE_FORWARD_SUCCESS: '[ROUTER] Navigate Forward Success',
  NAVIGATE_FORWARD_FAILED: '[ROUTER] Navigate Forward Failed',
  REGISTER_NAVIGATION: '[ROUTER] Register Navigation',
};

/** Navigate To Page Action */
export const Navigate = createAction(
  ROUTER_ACTIONS.NAVIGATE,
  props<{
    payload: RouterPayload;
  }>()
);

/** Register Navigation Action */
export const RegisterNavigation = createAction(
  ROUTER_ACTIONS.REGISTER_NAVIGATION,
  props<{
    payload: Route;
  }>()
);

/** Navigate Back Action */
export const NavigateBack = createAction(ROUTER_ACTIONS.NAVIGATE_BACK);

/**
 * @ignore
 * Navigate Back Success Action
 */
export const NavigateBackSuccess = createAction(
  ROUTER_ACTIONS.NAVIGATE_BACK_SUCCESS
);

/**
 * @ignore
 * Navigate Back Fail Action
 */
export const NavigateBackFail = createAction(ROUTER_ACTIONS.NAVIGATE_BACK_FAIL);

/** Navigate Forward Action */
export const NavigateForward = createAction(ROUTER_ACTIONS.NAVIGATE_FORWARD);

/**
 * @ignore
 * Navigate Forward Success Action
 */
export const NavigateForwardSuccess = createAction(
  ROUTER_ACTIONS.NAVIGATE_FORWARD_SUCCESS
);

/**
 * @ignore
 * Navigate Forward Fail Action
 */
export const NavigateForwardFail = createAction(
  ROUTER_ACTIONS.NAVIGATE_FORWARD_FAILED
);
