import { Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppHeroComponent } from './app-hero/app-hero.component';
import { AppSitemapComponent } from './app-sitemap/app-sitemap.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppPagesDefaultComponent } from './app-pages-default/app-pages-default.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', redirectTo:'/home',pathMatch: 'full' },
    // { path: 'login', component: AppLoginComponent},
    { path: 'home', component: AppHomeComponent,
    children: [
        { path: '', component: AppPagesDefaultComponent }, // empty path makes it the default with HomePageComponent
        // { path: 'page-content', component: PageContentComponent }, //its optional because Page Content Component as default allowed with HomePageComponent may in future required
        // { path: 'category-details', component: CategoryDetailsComponent },
        // { path: 'card-checkout', component: CardCheckoutComponent },
      ]
 },
]

