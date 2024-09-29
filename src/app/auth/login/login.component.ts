import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';
  

  onSubmit(formData: NgForm) {
    console.log("EMAIL", formData.form.value.email);
    console.log("PASSWORD", formData.form.value.password);
  }
}
