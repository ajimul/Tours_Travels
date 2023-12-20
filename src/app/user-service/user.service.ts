import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
platformId: Object;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }
  currentUser$ = new BehaviorSubject<{ id: string; name: string } | null | undefined >(undefined);
  setCurrentUser() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('access_token')) {
      this.currentUser$.next({ id: '1', name: 'Foo' });
    } else {
      this.currentUser$.next(null);
    }
  }
}
