import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class guardGuard implements CanActivate {
  constructor( private route: Router,private authService: UserService) { }
  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (!user) {
          this.route.navigateByUrl('/');
          return false;
        }
        return true;
      })
    );
  }
}