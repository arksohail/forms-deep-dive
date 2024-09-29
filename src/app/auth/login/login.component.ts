import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  
  form = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl("", {
      validators: [Validators.required, Validators.minLength(3)]
    }),
  });
  
  get emailIsInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid
  }
  get passwordIsInvalid() {
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid
  }

  onSubmit() {
    console.log("FORM", this.form);
    console.log("EMAIL", this.form.value.email);
    console.log("PASSWORD", this.form.value.password);
  }
}