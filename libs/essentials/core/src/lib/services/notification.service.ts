import { TranslateService } from '@ngx-translate/core';
import { Notification, NotificationState } from './../models/notification';
import { Injectable, EventEmitter } from '@angular/core';
import { nanoid } from 'nanoid';
import { NotificationType } from '../enums/notification-type.enum';
/**
 * Notification Service Class
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  /** notification subject */
  public notification = new EventEmitter<Notification>();

  constructor(private translateService: TranslateService) { }

  /**
   * Notify Info
   * @param {string} title notification title
   * @param {string|string[]} message notification message
   */
  public info(title: string, message?: string | string[]) {
    this.notification.emit(
      this.formatAndTranslateNotification(
        new Notification({
          id: nanoid(),
          title,
          type: NotificationType.info,
          message,
          state: NotificationState.active,
          createdAt: new Date(),
        })
      )
    );
  }

  /**
   * Notify Success
   * @param {string} title notification title
   * @param {string|string[]} message notification message
   */
  public success(title: string, message?: string | string[]) {
    this.notification.emit(
      this.formatAndTranslateNotification(
        new Notification({
          id: nanoid(),
          title,
          type: NotificationType.success,
          message,
          state: NotificationState.active,
          createdAt: new Date(),
        })
      )
    );
  }

  /**
   * Notify Warning
   * @param {string} title notification title
   * @param {string|string[]} message notification message
   */
  public warning(title: string, message?: string | string[]) {
    this.notification.emit(
      this.formatAndTranslateNotification(
        new Notification({
          id: nanoid(),
          title,
          type: NotificationType.warning,
          message,
          state: NotificationState.active,
          createdAt: new Date(),
        })
      )
    );
  }

  /**
   * Notify Error
   * @param {string} title notification title
   * @param {string|string[]} message notification message
   */
  public error(title: string, message?: string | string[]) {
    this.notification.emit(
      this.formatAndTranslateNotification(
        new Notification({
          id: nanoid(),
          title,
          type: NotificationType.error,
          message,
          state: NotificationState.active,
          createdAt: new Date(),
        })
      )
    );
  }

  public parseMessage(message: string | string[]): string {
    if (!message) {
      return '';
    }
    if (Array.isArray(message)) {
      let result = '';
      for (const item of message) {
        result += `${item} `;
      }
      return result.trim();
    }
    return message.toString();
  }

  public formatAndTranslateNotification(notif: Notification) {
    if (!notif.title) {
      notif.title = '';
    }
    if (!notif.message) {
      notif.message = [];
    } else if (typeof notif.message === 'string') {
      notif.message = [notif.message];
    }

    notif.message = notif.message.filter((x) => x);
    const texts = this.translateService.instant([
      notif.title,
      ...notif.message,
    ]);
    if (notif.title) {
      notif.title = texts[notif.title].replace(/[.\s]+$/g, '');
    }

    let concatenatedMessage = '';
    (notif.message as string[]).forEach((message) => {
      concatenatedMessage += texts[message].replace(/[.\s]+$/g, '') + '. ';
    });
    notif.message = concatenatedMessage;
    notif.displayMessage = this.parseMessage(notif.message);
    return notif;
  }
}
