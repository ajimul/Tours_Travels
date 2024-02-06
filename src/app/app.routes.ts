import { Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppPagesDefaultComponent } from './app-pages-default/app-pages-default.component';
import { AppLoginComponent } from './app-admin-panel/app-login/app-login.component';
import { AppAdminHomeComponent } from './app-admin-panel/app-admin-home/app-admin-home.component';
import { guardGuard } from './route-guard/guard.guard';
import { AppSettingComponent } from './app-admin-panel/app-setting/app-setting.component';
import { ItineraryViewComponent } from './app-admin-panel/app-itinerary-configuration/itinerary-view/itinerary-view.component';

export const routes: Routes = [
  {
    path: '', component: AppHomeComponent, children: 
    [
      { path: '', component: AppPagesDefaultComponent },
    ],
  },
  { path: 'login', component: AppLoginComponent },
  {
    path: 'control-panel',
    component: AppAdminHomeComponent,
    canActivate: [guardGuard],
    children: [
      { path: 'itinerary-view', component: ItineraryViewComponent },
      { path: 'app-setting', component: AppSettingComponent },
    ],
  },
];
