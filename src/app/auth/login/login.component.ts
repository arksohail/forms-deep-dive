import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';


function mustContainaQuesionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null
  }
  return { doesNotContainQuestionMark: true }
}

let initialemailvalue = '';
const savedForm = window.localStorage.getItem("saved-login-form");
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialemailvalue = loadedForm.email
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialemailvalue, {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl("", {
      validators: [Validators.required, Validators.minLength(3), mustContainaQuesionMark]
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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // const savedForm = window.localStorage.getItem("saved-login-form");
    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   // this.form.controls.email.setValue(loadedForm.email);
    //   this.form.patchValue({
    //     email: loadedForm.email,
    //   })
    // }

    const subscription = this.form
      .valueChanges
      .pipe(
        debounceTime(3000),
        distinctUntilChanged((prev, curr) => prev.email === curr.email)
      )
      .subscribe({
        next: (val) => {
          const loadEmail = val.email;
          let savedEmail: string;
          if (loadEmail) {
            savedEmail = JSON.stringify({ email: val.email });
            window.localStorage.setItem("saved-login-form", savedEmail);
          }
        }
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}