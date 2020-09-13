import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthStore} from '../../../services/stores/auth.store';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  file: File = null;
  addProductForm: FormGroup;

  nameControl: FormControl;
  priceControl: FormControl;
  categoryControl: FormControl;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router ) {
    this.initializeControls();
    this.attachControlsToForm();
  }

  initializeControls(): void {
    this.nameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.priceControl = new FormControl('', [
      Validators.required,
    ]);
    this.categoryControl = new FormControl('Cat', [
      Validators.required,
      Validators.minLength(2)
    ]);
  }


  private attachControlsToForm() {
    this.addProductForm = this.fb.group({
      name: this.nameControl,
      price: this.priceControl,
      category: this.categoryControl
    });
  }

  ngOnInit(): void {
  }

  uploadFile(event) {
    // for (let index = 0; index < event.length; index++) {
    //   const element = event[index];
    //   this.fileNames.push(element.name);
    // }

    if (event.length !== 1) {
      alert('only one image allowed');
    }
    else {
      this.file = event[0];
    }
  }

  deleteAttachment() {
    //this.fileNames.splice(index, 1);
    this.file = null;
  }

  uploadProduct() {
    if (this.addProductForm.valid && this.file != null) {
      this.productService.uploadProduct(this.nameControl.value, this.priceControl.value, this.categoryControl.value, this.file).subscribe(
        () => this.router.navigateByUrl('/shop'),
        (error) => alert('error in upload product')
      );
    }

  }


}
