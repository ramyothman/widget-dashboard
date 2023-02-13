/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * Value Accessor Base implements ControlValueAccessor to allow form control directives integrate with Angular forms
 * PS> Implmented methods from the ControlValueAccessor shouldn't be called directly as they are framework callbacks
 */

import { BaseComponent } from './base.component';
import { ControlValueAccessor } from '@angular/forms';
import { Component, Input } from '@angular/core';

export class ValueAccessorBase<T>
  extends BaseComponent
  implements ControlValueAccessor
{
  private innerValue!: T;
  /** mark control as touched */
  touched = false;
  /** mark control as disabled */
  isDisabled = false;
  /** indicate input pre selected */
  isSelected = false;
  onChange = (innerValue: any) => {};
  onTouched = () => {};

  /** get current value for the control */
  get value(): T {
    if (!this.innerValue) {
      (<any>this.innerValue) = '';
    }
    return this.innerValue;
  }

  /** set the current control value and markit for change and as touched */
  set value(value: T) {
    this.markAsTouched();
    if (!this.isDisabled && this.innerValue !== value) {
      // tslint:disable-next-line: prefer-conditional-expression
      if ((value as any) === undefined || (value as any) === null) {
        this.innerValue = (typeof(this.innerValue) === 'string') ?  '' as any : (typeof(this.innerValue) === 'boolean' ? false : '');
      } else {
        this.innerValue = value;
      }
      this.isSelected = false;
      this.onChange(this.innerValue);
    }
  }

  /**
   * this method is called by the Forms module to write a value into a form control
   * @param value value to be written
   */
  writeValue(value: T) {
    this.innerValue = value;
  }

  /**
   * When a form value changes due to user input, we need to report the value back to the parent form.
   * This is done by calling a callback, that was initially registered with the control using the registerOnChange method
   * @param onChange registered callback
   */
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  /**
   * When the user first interacts with the form control, the control is considered to have the status touched,
   * which is useful for styling. In order to report to the parent form that the control was touched,
   * we need to use a callback registered using the registerOnToched method
   * @param onTouched registered callback
   */
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  /**
   * Mark control as touched
   */
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  /**
   * Allow setting the control disabled from a reactive form
   * @param disabled disabled value
   */
  setDisabledState(disabled: boolean) {
    this.isDisabled = disabled;
  }
}
