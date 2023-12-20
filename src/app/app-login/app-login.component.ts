import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { ApiService } from '../api-service/api-service.service';
import { UserService } from '../user-service/user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterOutlet,MatButtonModule, MatDialogModule
  ],
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.css'
})
export class AppLoginComponent implements OnInit {
  responsedata: any;
  username: string = '';
  password: string = '';
  constructor(
    private apiService: ApiService,
    private route: Router,
    private userService: UserService,
    public dialogRef: MatDialogRef<AppLoginComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

  ngOnInit(): void {

  }

  loginform = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl('password', Validators.required)
  });
  get getEmail() {
    return this.loginform.get('email')?.value;
  }
  Proceedlogin() {
    if (this.loginform.valid) {
      this.apiService.loginn(this.loginform.value)
        .subscribe({
          next: (data) => {
            this.userService.setCurrentUser();
            this.responsedata = data;
            localStorage.setItem('access_token', this.responsedata.access_token);
            localStorage.setItem('refresh_token', this.responsedata.refresh_token);
            this.route.navigate(['/home']);
            // alert("Login Successfull!");
          }, error: (e) => {
            alert("Login Faieled!");
          }, complete: () => {
            const emailValue = this.getEmail;
            this.dialogClose(emailValue!);
          }
        });
    }
  }
  dialogClose(emain:string): void {
    this.dialogRef.close({ email: emain});
  }
}