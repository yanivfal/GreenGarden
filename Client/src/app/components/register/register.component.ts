import {Component, OnChanges, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {User} from '../../models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {invalid} from '@angular/compiler/src/render3/view/util';
import {AuthStore} from '../../services/stores/auth.store';
import {MessengerService} from '../../services/messenger.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  wasTryToSubmitted = false;
  regForm: FormGroup;

  firstNameControl: FormControl;
  lastNameControl: FormControl;
  emailControl: FormControl;
  passControl: FormControl;

  constructor(private fb: FormBuilder, private auth: AuthStore, private router: Router,
              private messageService: MessengerService) {
    this.initializeControls();
    this.attachControlsToForm();
  }

  ngOnInit(): void {
  }

  initializeControls(): void {
    this.firstNameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.lastNameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.passControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
  }


  private attachControlsToForm() {
    this.regForm = this.fb.group({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      password: this.passControl
    });
  }

  getValidationClasses(controlName: string) {
      if (this.regForm.controls[controlName].valid){
        return 'is-valid';
      }
      else {
        if (this.wasTryToSubmitted){
          return 'is-invalid';
        }
      }
  }

  submitForm() {
    this.wasTryToSubmitted = true;
    if (this.regForm.valid){
      const newUser = this.regForm.value;
      this.auth.register(newUser)
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
}
