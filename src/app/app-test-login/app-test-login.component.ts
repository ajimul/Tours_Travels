import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { ApiService } from '../api-service/api-service.service';
import { UserService } from '../user-service/user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-app-test-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterOutlet ],
  templateUrl: './app-test-login.component.html',
  styleUrl: './app-test-login.component.css'
})
export class AppTestLoginComponent {
  constructor(){
    console.log('loginn page open')
  }

}
