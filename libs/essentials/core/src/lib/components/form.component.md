# FormComponent

Base Component for forms in the App.

## Usage

1. Extend the FormComponent
1. Implement the two abstract methods `submitForm` & `customValidate`
   `submitForm` add the logic necessary for saving or form submission.
   `customValidate` custom validation that needs to be set extra on top of the form validation.
   `preSubmitForm` add logic prior to starting form submission logic.
   We need to set inside the `valid` variable to false in case of validation failure
1. In the Child Constructor add reference to `super(modelService, formBuilder);`
1. Initialize the form

```
this.init({
      firstName: ['Ramy', Validators.required],
      lastName: ['Othman'],
      address: this.group({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      aliases: this.array([this.fb.control('')]),
});
```

1. To Update Form Model Values

```
this.patchValue({
      firstName: 'Nancy',
      lastName: 'Ajram',
      address: {
        street: '123 Drew Street',
      },
});
```

1. To Reset the form call the `resetForm` function
1. To check if the main object has been modified you can use the `modified` property
1. To disable guard check for component deactivation set the variable `guardDisabled = true`
