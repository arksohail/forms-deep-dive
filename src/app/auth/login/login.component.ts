import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent {
  form = viewChild.required<NgForm>("form");;
  destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem("saved-login-form");
      if(savedForm) {
        const loadFormValues = JSON.parse(savedForm);
        const savedEmail = loadFormValues.email;
        setTimeout(()=> {
          this.form().controls["email"].setValue(savedEmail);
        }, 1)
      }

      const subscription = this.form()
      .valueChanges?.pipe(
        debounceTime(3000),
        distinctUntilChanged((prev, curr) => prev.email === curr.email),
        tap({
            next: () => {console.log("CALLED")}
        })
      )
      .subscribe({
        next: (val) => {
          console.log(val.email);
          window.localStorage.setItem("saved-login-form", JSON.stringify({email: val.email}));
        },
      });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(formData: NgForm) {
    if(formData.form.invalid) {
      return;
    }
    console.log("EMAIL", formData.form.value.email);
    console.log("PASSWORD", formData.form.value.password);

    console.log(formData.form.valid);

    formData.form.reset();
  }
}
