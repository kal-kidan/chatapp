import { Injectable, NgZone } from '@angular/core'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  showSuccess(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'Close', {
        duration: 4000,
        panelClass: ['mat-toolbar', 'alert-success'],
      });
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, 'Close', {
        duration: 40000,
        panelClass: ['mat-toolbar', 'error'],
      });
    });
  }
}
