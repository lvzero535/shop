import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '@core';
import { NzNotificationService } from 'ng-zorro-antd';

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,
              private authService: AuthService,
              private notification: NzNotificationService,
              private loginService: LoginService) {}

  submitForm(val: LoginFormData): void {
    console.log(val);
    this.loginService.login(val).subscribe((resp) => {
      console.log(resp);
      this.authService.setToken(JSON.stringify(resp));
      this.notification.success('登录提示', '登录成功，欢迎回来！');
      this.router.navigate(['/home']);
    });
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
