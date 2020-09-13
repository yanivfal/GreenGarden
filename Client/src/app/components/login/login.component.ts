import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthStore} from '../../services/stores/auth.store';
import {MessengerService} from '../../services/messenger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  wasTryToSubmitted = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthStore,
    private  messageService: MessengerService) {

    this.loginForm = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true, [Validators.required]]
    });
  }

  ngOnInit() {

  }

  login() {
    this.wasTryToSubmitted = true;
    if (this.loginForm.valid) {
      const val = this.loginForm.value;
      this.auth.login(val.email, val.password, val.remember)
        .subscribe(
          () => {
            this.router.navigateByUrl('/shop');
          },
          err => {
            this.messageService.alertMessage(err.error);
          }
        );
    }

  }

  getValidationClasses(controlName: string) {
    if (!this.loginForm.controls[controlName].valid){
      if (this.wasTryToSubmitted){
        return 'is-invalid';
      }
    }
  }

}
