import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  onSubmit() {
    console.log("FORM", this.form);
    console.log("EMAIL", this.form.value.email);
    console.log("PASSWORD", this.form.value.password);
  }
}