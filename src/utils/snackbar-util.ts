import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarUtil {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, duration: number = 1500){
    const config = new MatSnackBarConfig();
    config.panelClass = ['my-snackbar'];
    config.duration = 1500;
    this.snackBar.open(message, 'Close', config);
  }
}
