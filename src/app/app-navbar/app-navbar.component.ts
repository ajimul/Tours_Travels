import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { ApiService } from '../api-service/api-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
  @ViewChild('contactInfo') contactInfo: ElementRef;
  @ViewChild('loginInfo') loginInfo: ElementRef;

  xxx: boolean = true;
  isLoginn: boolean = false;
  // isLoginn: boolean = true;
  email: any = '';
  welcomeUser: any = 'Guest!';

  toggleItems: { [key: string]: boolean } = {};
  isFlyOut: boolean = false;
  isContactFlyOut: boolean = false;

  constructor(
    private route: Router,
    private apiService: ApiService,
    private dialog: MatDialog,
  ) {
    this.contactInfo = {} as ElementRef;
    this.loginInfo = {} as ElementRef;
  }

  ngOnInit(): void {

  }

  toggleClickEvent(item: string): void {
    this.toggleItems[item] = !this.toggleItems[item];
    this.handleItemClick(item);
  }

  isRotated(item: string): boolean {
    return this.toggleItems[item];
  }

  handleItemClick(item: string): void {
    switch (item) {
      case 'contactInfo_flyout':
        this.isFlyOut = false;
        if (!this.isContactFlyOut) {
          this.isContactFlyOut = true;
        } else {
          this.isContactFlyOut = false;
        }
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any): void {
    const contactInfo = this.contactInfo?.nativeElement;
      if (contactInfo &&!contactInfo.contains(event.target)) {
      this.isFlyOut = false;
      this.isContactFlyOut = false;
    }
  }
  
  
}
