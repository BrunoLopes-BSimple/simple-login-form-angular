import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginInfo } from '../../interfaces/login-info';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  @Output() sendLoginInfo = new EventEmitter<LoginInfo>();
  @Output() sendRegisterRequest = new EventEmitter<boolean>();

  login() {
    if (this.loginForm.valid) {
      const loginInfo = {
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? '',
      }

      this.sendLoginInfo.emit(loginInfo);
    } else {
      alert("Invalid login data.");
    }
  }

  register() {
    this.sendRegisterRequest.emit(true);
  }
}
