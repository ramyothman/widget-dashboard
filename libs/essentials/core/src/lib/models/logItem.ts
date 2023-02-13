/** log item */
export class LogItem {
  /** log item message */
  public message!: string;
  /** log item error code */
  public code!: string;
  /** log item description */
  public description!: string;
  /** log item event source */
  public eventSource!: string;
  /** log item acquisition Time */
  public acquisitionTime!: Date;
  /** log item payload */
  public payload: any;

  /** @ignore */
  constructor(init?: Partial<LogItem>) {
    Object.assign(this, init);
  }
}
