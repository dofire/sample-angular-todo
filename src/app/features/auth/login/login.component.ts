import { assertPlatform, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  email = signal('');
  password = signal('');
  remember = signal(false);

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });

    this.email.set(localStorage.getItem('email') || '');
    this.password.set(localStorage.getItem('password') || '');
    this.remember.set(localStorage.getItem('remember') === 'true');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, remember } = this.loginForm.value;

      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      alert(`Login data: ${email}, ${password}, ${remember}`);

      this.router.navigate(['/main']);

      // TODO: Replace with actual login API
      // this.authService.login(email, password, remember).subscribe(...)
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  onRememberedChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    console.log('Checkbox changed:', checkbox.checked);
    this.remember.set(checkbox.checked);

    localStorage.setItem('remember', checkbox.checked ? 'true' : 'false');
  }

  onSocialLogin(provider: 'google' | 'apple' | 'facebook') {
    alert(`Login with ${provider}`);
    // TODO: Trigger OAuth flow
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
    // TODO: Navigate to reset password or show modal
  }
}
