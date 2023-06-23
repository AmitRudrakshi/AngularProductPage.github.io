import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar) { }
//replacement of alert messages
  openSnackBar(message: string, action: string = 'OK') {
    this._snackBar.open(message, action,  {
      duration: 1000,
      verticalPosition: 'top',
    });
  }
}
