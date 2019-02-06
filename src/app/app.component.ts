import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  color: string = 'primary';

  snackBarRef;
  networkStatus: boolean = navigator.onLine;

  constructor(
    public snackBar: MatSnackBar
  ){

    if (!this.networkStatus) {
      this.snackBarRef = this.snackBar.openFromComponent(SnackBarStatusNetworkOfflineComponent, {
      });
    }

    window.addEventListener('online', () => {
      this.snackBarRef.dismiss();
    });
  
    window.addEventListener('offline', () => {
      this.snackBarRef = this.snackBar.openFromComponent(SnackBarStatusNetworkOfflineComponent, {
      });
    });
  }
}

@Component({
  selector: 'snack-bar-status-network-offline-component',
  templateUrl: 'snack-bar-status-network-offline.html',
  styles: [`.network-offline { color: hotpink; }`],
  
})
export class SnackBarStatusNetworkOfflineComponent {}