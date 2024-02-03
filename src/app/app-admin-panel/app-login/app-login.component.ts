import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api-service/api-service.service';
import { Router } from '@angular/router';
import { TokenService } from '../../token-service/token.service';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../user-service/user.service';

@Component({
  selector: 'app-app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.css',
})
export class AppLoginComponent implements OnInit {
  responsedata: any;
  constructor(
    private service: ApiService,
    private route: Router,
    private user: UserService,
    private token: TokenService
  ) {
  }

  ngOnInit(): void {}
  loginform = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
   
  });

  loginn() {

    if (this.loginform.valid) {
    
      this.service.loginn(this.loginform.value).subscribe((result) => {
        this.responsedata = result;
        if (this.responsedata != null) {
          localStorage.removeItem;
          this.token.setAccessToken(this.responsedata.access_token);
          this.token.setRefreshToken(this.responsedata.access_token);
          this.user.initializeCurrentUser();
          this.route.navigate(['control-panel'], { replaceUrl: false });
        } else {
          
          alert('login Faield!');
        }
      });
    }
  }
 
}
