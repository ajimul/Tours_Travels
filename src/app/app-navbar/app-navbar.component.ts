import { Component, OnInit } from '@angular/core';
import { CardValueService } from '../share-data/card-value.service';

import { ApiService } from '../api-service/api-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppLoginComponent } from '../app-login/app-login.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './app-navbar.component.html',
  styleUrl: './app-navbar.component.css',
})
export class AppNavbarComponent implements OnInit {
  isLoginn: boolean = false;
  // isLoginn: boolean = true;
  email: any = '';
  welcomeUser: any = 'Guest!';
  
  rotatedItems: { [key: string]: boolean } = {};

  constructor(
    private route: Router,
    private cardValue: CardValueService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  toggleRotation(item: string): void {
    console.log(this.rotatedItems[item]);
    this.rotatedItems[item] = !this.rotatedItems[item];
    this.handleItemClick(item);
  }

  isRotated(item: string): boolean {
    return this.rotatedItems[item];
  }

  handleItemClick(item: string): void {
    switch (item) {
      case 'login':
        if (!this.isLoginn) {
          this.openLoginDialog();
        } else {
          this.logOut();
        }
        break;
      case 'holidays':
        break;
      case 'fixedDeparture':
        break;
      case 'customizedHolidays':
        break;
      case 'support':
        break;
    }
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(AppLoginComponent, {
      width: '29%',
      height: '50%',
      data: [],
    });

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        this.email = data.email;
        this.welcomeUser = data.email + '!';
        this.isLoginn = true;
      },
      error: (e) => {
        this.isLoginn = false;
      },
      complete: () => {},
    });
  }
  logOut() {
    this.apiService.logout().subscribe({
      next: (value) => {
        this.welcomeUser = 'Guest!';
        this.isLoginn = false;
        this.email=null;
      },
      error: (e) => {},
      complete: () => {},
    });
  }
}
