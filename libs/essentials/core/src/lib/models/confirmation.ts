/* eslint-disable @typescript-eslint/ban-types */
import { EventEmitter } from '@angular/core';
/**
 * Confirmation interface presents the main properties for the Confirmation Modal
 */
export interface Confirmation {
  /** key for confirmation message */
  key?: string;
  /** message to be displayed */
  message?: string;
  /** confirmation modal title */
  title?: string;
  /** function to be executed on accept */
  // tslint:disable-next-line: ban-types
  accept?: Function;
  /** function to be executed on reject */
  // tslint:disable-next-line: ban-types
  reject?: Function;
  /** function to be executed on discard */
  // tslint:disable-next-line: ban-types
  discard?: Function;
  /** accept label text */
  acceptLabel?: string;
  /** reject label text */
  rejectLabel?: string;
  /** discard label text */
  discardLabel?: string;
  /** hide accept label text */
  hideAcceptLabel?: boolean;
  /** hide reject label text */
  hideRejectLabel?: boolean;
  /** hide discard label text */
  hideDiscardLabel?: boolean;
  /** event to be fired on acceptance */
  acceptEvent?: EventEmitter<any>;
  /** event to be fired on rejection */
  rejectEvent?: EventEmitter<any>;
  /** event to be fired on discard */
  discardEvent?: EventEmitter<any>;
}
