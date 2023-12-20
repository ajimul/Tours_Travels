import { Component } from '@angular/core';
import { AppNavbarComponent } from "../app-navbar/app-navbar.component";
import { AppSitemapComponent } from "../app-sitemap/app-sitemap.component";
import { RouterOutlet } from '@angular/router';
import { AppPagesDefaultComponent } from "../app-pages-default/app-pages-default.component";

@Component({
    selector: 'app-app-home',
    standalone: true,
    templateUrl: './app-home.component.html',
    styleUrl: './app-home.component.css',
    imports: [AppNavbarComponent, AppSitemapComponent, RouterOutlet, AppPagesDefaultComponent]
})
export class AppHomeComponent {

}
