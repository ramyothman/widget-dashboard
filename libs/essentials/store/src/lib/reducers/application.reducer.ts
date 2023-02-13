/* eslint-disable no-empty */
import { Notification } from '@factoryplus/core';
import { createReducer, on } from '@ngrx/store';
import * as ApplicationActions from '../actions/application.action';
import {
  ApplicationState,
  applicationInitialState,
} from '../states/application.state';
/**
 * @ignore
 */
export const reducer = createReducer(
  applicationInitialState,
  on(ApplicationActions.addNotification, (state: ApplicationState, action) => {
    const notificationsNew = [...state.notifications, action.notification];
    const shownNotifications = getNotifications(notificationsNew);
    return {
      ...state,
      notifications: shownNotifications,
    };
  }),
  on(
    ApplicationActions.dismissNotification,
    (state: ApplicationState, action) => {
      const index = state.notifications.findIndex(
        (notification) => notification.id === action.payload
      );
      if (index === -1) {
        return state;
      }
      const notificationsNew = [
        ...state.notifications.slice(0, index),
        ...state.notifications.slice(index + 1),
      ];

      const shownNotifications = getNotifications(notificationsNew);
      return {
        ...state,
        notifications: shownNotifications,
      };
    }
  ),
  on(ApplicationActions.applicationFail, (state: ApplicationState, action) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(ApplicationActions.toggleMenu, (state: ApplicationState, action) => {
    return {
      ...state,
      openMenu: action.show,
    };
  })
);

export function getNotifications(notificaions: Notification[]) {
  let reducedDuplicates: Notification[] = [];
  for (const item of notificaions) {
    if (reducedDuplicates.length > 0) {
      const dup = reducedDuplicates[reducedDuplicates.length - 1];
      if (
        dup &&
        dup.title === item.title &&
        dup.type === item.type &&
        dup.message === item.message
      ) {
        reducedDuplicates = [
          ...reducedDuplicates.slice(0, reducedDuplicates.length - 1),
          { ...dup, count: (dup.count || 0) + 1 },
        ];
      } else {
        reducedDuplicates.push(item);
      }
    } else {
      reducedDuplicates.push(item);
    }
  }

  return reducedDuplicates.slice(-3);
}

export function removeNotification(
  notifications: Notification[],
  index: number
): Notification[] {
  const itemFound = { ...notifications[index] };
  const result = [...notifications.slice(0, index)];
  let refound = true;
  for (let i = index + 1; i < notifications.length; i++) {
    const dup = notifications[i];
    if (
      refound &&
      dup.title === itemFound.title &&
      dup.type === itemFound.type &&
      dup.message === itemFound.message
    ) {
    } else {
      refound = false;
      result.push({ ...notifications[i] });
    }
  }
  return result;
}
