import { Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppHeroComponent } from './app-hero/app-hero.component';
import { AppSitemapComponent } from './app-sitemap/app-sitemap.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppPagesDefaultComponent } from './app-pages-default/app-pages-default.component';
import { AppComponent } from './app.component';
import { AppLoginComponent } from './app-admin-panel/app-login/app-login.component';
import { AppAdminHomeComponent } from './app-admin-panel/app-admin-home/app-admin-home.component';
import { guardGuard } from './route-guard/guard.guard';
import { AppSettingComponent } from './app-admin-panel/app-setting/app-setting.component';
import { ItineraryViewComponent } from './app-admin-panel/app-itinerary-configuration/itinerary-view/itinerary-view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',component: AppHomeComponent, children: [
      { path: '', component: AppPagesDefaultComponent }, // empty path makes it the default with HomePageComponent
    ],
  },
  // { path: 'login', component: AppLoginComponent },
  // {
  //   path: 'control-panel',
  //   component: AppAdminHomeComponent,
  //   canActivate: [guardGuard],
  //   children: [
  //     {path:'itinerary-view',component:ItineraryViewComponent},
  //     {path:'app-setting',component:AppSettingComponent},
  //   ],
  // },
];

