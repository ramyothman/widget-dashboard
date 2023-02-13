import { NotificationType } from "../enums/notification-type.enum";

export enum NotificationState {
  active = 1,
  historical = 0,
}

export class Notification {
  public id!: string;
  public title!: string;
  public type!: NotificationType;
  public message!: string | string[];
  public displayMessage!: string;
  public state!: NotificationState;
  public createdAt!: Date;
  public count?: number = 0;
  public isDismissible?: boolean = true;
  constructor(init?: Partial<Notification>) {
    Object.assign(this, init);
  }
}
