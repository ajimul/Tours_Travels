import { Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppHeroComponent } from './app-hero/app-hero.component';
import { AppSitemapComponent } from './app-sitemap/app-sitemap.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppPagesDefaultComponent } from './app-pages-default/app-pages-default.component';
import { AppComponent } from './app.component';
import { AppTestLoginComponent } from './app-test-login/app-test-login.component';
import { AppPagesNavigationComponent } from './app-pages-navigation/app-pages-navigation.component';

export const routes: Routes = [
    { path: '', redirectTo:'/home',pathMatch: 'full' },
    { path: 'home', component: AppHomeComponent,
    children: [
        { path: '', component: AppPagesDefaultComponent }, // empty path makes it the default with HomePageComponent
      {path:'nav',component:AppPagesNavigationComponent}
      ]
 },
]

