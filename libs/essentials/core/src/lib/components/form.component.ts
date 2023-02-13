import {
  Input,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  AbstractControlOptions,
  FormGroup,
  FormBuilder,
  ValidatorFn,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CanComponentDeactivate } from '../services/guards/can-deactivate-guard.service';
import { ModelService } from '../services/model.service';
import { BaseComponent } from './base.component';
/**
 * This class acts as a base form component for all components that include savable forms
 */
@Component({
  template: ``,
})
export abstract class FormComponent
  extends BaseComponent
  implements CanComponentDeactivate {
  /** disable guard check for component deactivation */
  @Input() guardDisabled = false;
  /** The model primary key name (property name) */
  @Input() modelIdKey!: string;
  /** The model primary key value */
  modelIdValue!: string;
  /** the FormGroup Variable */
  form!: FormGroup;
  /** Observable for the model current saving state */
  saving$!: Observable<boolean>;
  /** Value if the form is currently being saved */
  saving = false;
  /** Original Form Properties for form reset */
  _originalFormProperties!: {
    controlsConfig: {
      [key: string]: any;
    };
    options?: AbstractControlOptions | null;
  };
  /** form model object as BehaviorSubject */
  _model: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  /** setter for the form model */
  @Input()
  set model(value: any) {
    this.modelIdValue = '';
    this._model.next(value);
    this.modelIdValue =
      this.modelIdKey && value[this.modelIdKey] ? value[this.modelIdKey] : null;
    this.modelService.set(value);
  }
  /** getter for the form model */
  get model(): any {
    return this._model.getValue();
  }
  /** form model isnew record state */
  get isNew() {
    if (!this.modelIdKey) {
      // case when there is no modelIdKey provided object is considered always new
      return true;
    }
    return (
      !this.model[this.modelIdKey] ||
      this.model[this.modelIdKey] === '' ||
      this.model[this.modelIdKey] === 0
    );
  }
  /** form modified state */
  get modified(): boolean {
    return this.modelService.isChanged();
  }
  /** get form valid state */
  get isValid(): boolean {
    return this.form.valid;
  }
  /** Event Output fired on formUpdated */
  @Output() formUpdated = new EventEmitter<any>();
  /** Event fired on form Submisssion */
  @Output() formSubmitted = new EventEmitter<any>();
  /**
   * @description
   * constructor for form base class
   *
   * @param modelService model service
   * @param formBuilder form builder
   *
   * In constructor of the inheriting class add the below code
   * @example
   * super(modelService, formBuilder)
   */
  constructor(
    protected modelService: ModelService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  /**
   * if value of the saving observable was provided we initialize the subscription to it
   */
  childConstructorLoaded() {
    if (this.saving$) {
      this.subscription = this.saving$.subscribe((saving) => {
        if (saving !== null || saving !== undefined) {
          this.saving = saving;
        }
      });
    }
  }

  /**
   * @description
   * Validate & Submit form in case model state is valid
   */
  public submit() {
    if (!this.saving && this.form) {
      this.model = this.form.getRawValue();
      this.preSubmitForm(this.model);
      if (this.form.valid) {
        this.model = this.form.getRawValue();
        this.submitForm(this.model);
        this.formSubmitted.emit(this.model);
      } else {
        Object.keys(this.form.controls).forEach((key) => {
          this.form.controls[key].markAsDirty();
        });
        this.form.markAllAsTouched();
        this.submitFormFailed();
      }
    }
  }

  /**
   * @description
   * implement method from interface CanComponentDeactivate will be used in the
   * CanDeactivate guard
   */
  canDeactivate() {
    return !this.modified || this.guardDisabled;
  }

  /**
   * @description
   * Reset form to initial state
   */
  public resetForm() {
    this.init(
      this._originalFormProperties.controlsConfig,
      this._originalFormProperties.options
    );
  }

  /**
   * @description
   * abstract method for submitting form
   *
   * @param model model to be submitted
   * @example
   * protected submitForm(model: any): void {
   *    console.warn('form submitted', model);
   * }
   */
  protected abstract submitForm(model: any): void;
  protected abstract preSubmitForm(model: any): void;

  /**
   * @description
   * abstract method called when failed to submit form after calling the submit method
   */
  protected abstract submitFormFailed(): void;

  /******************************************************
   * Form Builder Section
   ******************************************************/

  /**
   * Patches the value of the `FormGroup`. It accepts an object with control
   * names as keys, and does its best to match the values to the correct controls
   * in the group.
   *
   * It accepts both super-sets and sub-sets of the group without throwing an error.
   *
   * @usageNotes
   * ### Patch the value for a form group
   *
   * ```
   * const form = new FormGroup({
   *    first: new FormControl(),
   *    last: new FormControl()
   * });
   * console.log(form.value);   // {first: null, last: null}
   *
   * form.patchValue({first: 'Nancy'});
   * console.log(form.value);   // {first: 'Nancy', last: null}
   * ```
   *
   * @param value The object that matches the structure of the group.
   * @param options Configuration options that determine how the control propagates changes and
   * emits events after the value is patched.
   * * `onlySelf`: When true, each change only affects this control and not its parent. Default is
   * true.
   * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
   * `valueChanges` observables emit events with the latest status and value when the control value
   * is updated. When false, no events are emitted. The configuration options are passed to
   * the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.
   */
  protected patchValue(
    value: {
      [key: string]: any;
    },
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) {
    this.form.patchValue(value, options);
    this._originalFormProperties.controlsConfig = this.modelService.cloneDeep(
      this.form.controls
    );
    this.model = this.form.getRawValue();
  }

  /**
   * @description
   * Initialize form group object
   *
   * @param controlsConfig A collection of child controls. The key for each child is the name
   * under which it is registered.
   *
   * @param options Configuration options object for the `FormGroup`. The object should have the
   * the `AbstractControlOptions` type and might contain the following fields:
   * * `validators`: A synchronous validator function, or an array of validator functions
   * * `asyncValidators`: A single async validator or array of async validator functions
   * * `updateOn`: The event upon which the control should be updated (options: 'change' | 'blur' |
   * submit')
   */
  protected init(
    controlsConfig: {
      [key: string]: any;
    },
    options?: AbstractControlOptions | null
  ) {
    this._originalFormProperties = {
      controlsConfig: this.modelService.cloneDeep(controlsConfig),
      options: this.modelService.cloneDeep(options),
    };
    this.form = this.group(controlsConfig, options);
    this.model = this.form.getRawValue();
    this.subscription = this.form.valueChanges
      .pipe(debounceTime(400))
      .subscribe((form) => {
        this._model.next(form);
        this.modelService.CurrentItem = this.form.getRawValue();
        this.formUpdated.emit(this.model);
      });
  }

  protected initByGroup(formGroup: FormGroup) {
    this.form = formGroup;
  }

  /**
   * @description
   * Construct a new `FormGroup` instance.
   *
   * @param controlsConfig A collection of child controls. The key for each child is the name
   * under which it is registered.
   *
   * @param options Configuration options object for the `FormGroup`. The object should have the
   * the `AbstractControlOptions` type and might contain the following fields:
   * * `validators`: A synchronous validator function, or an array of validator functions
   * * `asyncValidators`: A single async validator or array of async validator functions
   * * `updateOn`: The event upon which the control should be updated (options: 'change' | 'blur' |
   * submit')
   */
  protected group(
    controlsConfig: {
      [key: string]: any;
    },
    options?: AbstractControlOptions | null
  ) {
    return this.formBuilder.group(controlsConfig, options);
  }

  /**
   * @description
   * Construct a new `FormControl` with the given state, validators and options.
   *
   * @param formState Initializes the control with an initial state value, or
   * with an object that contains both a value and a disabled status.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains
   * validation functions and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator
   * functions.
   *
   * @usageNotes
   *
   * ### Initialize a control as disabled
   *
   * The following example returns a control with an initial value in a disabled state.
   *
   * <code-example path="forms/ts/formBuilder/form_builder_example.ts" region="disabled-control">
   * </code-example>
   */
  protected control(
    formState: any,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): FormControl {
    return this.formBuilder.control(formState, validatorOrOpts, asyncValidator);
  }

  /**
   * Constructs a new `FormArray` from the given array of configurations,
   * validators and options.
   *
   * @param controlsConfig An array of child controls or control configs. Each
   * child control is given an index when it is registered.
   *
   * @param validatorOrOpts A synchronous validator function, or an array of
   * such functions, or an `AbstractControlOptions` object that contains
   * validation functions and a validation trigger.
   *
   * @param asyncValidator A single async validator or array of async validator
   * functions.
   */
  protected array(
    controlsConfig: any[],
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): FormArray {
    return this.formBuilder.array(
      controlsConfig,
      validatorOrOpts,
      asyncValidator
    );
  }

  /**
   * Retrieves a child control given the control's name or path.
   *
   * @param path A dot-delimited string or array of string/number values that define the path to the
   * control.
   *
   * @usageNotes
   * ### Retrieve a nested control
   *
   * For example, to get a `name` control nested within a `person` sub-group:
   *
   * * `this.form.get('person.name');`
   *
   * -OR-
   *
   * * `this.form.get(['person', 'name']);`
   *
   * ### Retrieve a control in a FormArray
   *
   * When accessing an element inside a FormArray, you can use an element index.
   * For example, to get a `price` control from the first element in an `items` array you can use:
   *
   * * `this.form.get('items.0.price');`
   *
   * -OR-
   *
   * * `this.form.get(['items', 0, 'price']);`
   */
  // tslint:disable-next-line: array-type
  protected get(path: Array<string | number> | string): AbstractControl | null {
    return this.form.get(path);
  }
}
