import { Component, OnInit } from '@angular/core';
import { Manager } from 'src/app/interfaces/manager';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public manager: Manager;
  public formGroup: FormGroup;
  public roles = ['admin', 'editor', 'ghost'];
  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{4,20}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{4,20}$/)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['editor'],
    });
  }

  ngOnInit() {
    if (this.manager) {
      this.formGroup.setValue({
        username: this.manager.username,
        password: this.manager.password,
        email: this.manager.email,
        role: this.manager.role
      });
    }
  }

  submitForm(val) {}
}
