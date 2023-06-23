import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit {

  productForm: FormGroup;
  constructor(private _fb: FormBuilder, 
    private _apiService: ApiService,
    private _dialogRef: DialogRef<ProductAddEditComponent>, 
    private location: Location,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
    this.productForm=this._fb.group({
      // id:'',
      productName:'',
      description:'',
      amount:''
    })
  }
  ngOnInit(): void {
    this.productForm.patchValue(this.data);
    }

    reflectDBchange(){

    }

  onFormSubmit(){
    if(this.productForm.valid){
      if(this.data){
        if(this.productForm.value.productName!=='' && this.productForm.value.description!=='' && this.productForm.value.amount!==''){
        this._apiService.updateProduct(this.data._id, this.productForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Product details updated successfully", "OK");
            this._dialogRef.close();
            // window.location.reload();
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }else {
        this._coreService.openSnackBar("Fields cannot be empty!", "OK");

      }
      } else if(this.productForm.value.productName!=='' && this.productForm.value.description!=='' && this.productForm.value.amount!==''){
        this._apiService.addProduct(this.productForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Product added successfully", "OK");
            this._dialogRef.close();
            // window.location.reload();
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._coreService.openSnackBar("Fill all the fields", "OK");

      }
    }
  }
}
