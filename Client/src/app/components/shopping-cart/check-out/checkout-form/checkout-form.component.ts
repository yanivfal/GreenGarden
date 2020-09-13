import { Component, OnInit } from '@angular/core';
import {AuthStore} from '../../../../services/stores/auth.store';
import {Observable} from 'rxjs';
import {User} from '../../../../models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {async} from '@angular/core/testing';
import {Address} from '../../../../models/address';
import {Purchase} from '../../../../models/purchase';
import {addAriaReferencedId} from '@angular/cdk/a11y/aria-describer/aria-reference';
import {CartStore} from '../../../../services/stores/cart-store';
import {PurchaseService} from '../../../../services/purchase.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {

  wasTryToSubmitted = false;
  checkOutForm: FormGroup;
  firstNameControl: FormControl;
  lastNameControl: FormControl;
  emailControl: FormControl;

  cityControl: FormControl;
  streetControl: FormControl;
  homeNumberControl: FormControl;
  apartmentControl: FormControl;

  user: User;

  constructor(private fb: FormBuilder, private auth: AuthStore, private router: Router, private purchaseService: PurchaseService) {
    this.user = auth.getUserDetails();
    this.initializeControls();
    this.attachControlsToForm();
  }

  ngOnInit(): void {
  }

  initializeControls(): void {
    this.firstNameControl = new FormControl(this.user.firstName, [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.lastNameControl = new FormControl(this.user.lastName, [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.emailControl = new FormControl(this.user.email, [
      Validators.required,
      Validators.email
    ]);
    this.cityControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.streetControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.homeNumberControl = new FormControl('', [
      Validators.required,
    ]);
    this.apartmentControl = new FormControl('', [
      Validators.required,
    ]);
  }


  private attachControlsToForm() {
    this.checkOutForm = this.fb.group({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      city: this.cityControl,
      street: this.streetControl,
      homeNumber: this.homeNumberControl,
      apartment: this.apartmentControl,
    });
  }

  getValidationClasses(controlName: string) {
    if (this.checkOutForm.controls[controlName].valid){
      return 'is-valid';
    }
    else {
      if (this.wasTryToSubmitted){
        return 'is-invalid';
      }
    }
  }

  submit() {
    this.wasTryToSubmitted = true;
    if (this.checkOutForm.valid){
      const user: User = new User(this.firstNameControl.value, this.lastNameControl.value, this.emailControl.value);
      const address = new Address(this.cityControl.value, this.streetControl.value, this.homeNumberControl.value, this.apartmentControl.value);
      this.purchaseService.postPurchase(user, address)
        .subscribe(
          () => {
            this.router.navigateByUrl('/checkout/thanks');
          },
          err => {
            console.log(err);
          }
        );
    }
  }
}



