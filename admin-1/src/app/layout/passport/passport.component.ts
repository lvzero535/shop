import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core';
import { NzNotificationService } from 'ng-zorro-antd';

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}
@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss']
})
export class PassportComponent implements OnInit {

  validateForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,
              private authService: AuthService,
              private notification: NzNotificationService) {}

  submitForm(val: LoginFormData): void {
    console.log(val);
    this.authService.login(val).subscribe((resp) => {
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
