import { Component } from '@angular/core';
import { AppNavbarComponent } from "../app-navbar/app-navbar.component";
import { AppSitemapComponent } from "../app-sitemap/app-sitemap.component";
import { Router, RouterOutlet } from '@angular/router';
import { AppPagesDefaultComponent } from "../app-pages-default/app-pages-default.component";
import { Routes } from '@angular/router';
@Component({
    selector: 'app-app-home',
    standalone: true,
    templateUrl: './app-home.component.html',
    styleUrl: './app-home.component.css',
    imports: [AppNavbarComponent, AppSitemapComponent, RouterOutlet, AppPagesDefaultComponent]
})
export class AppHomeComponent {
    constructor(private route: Router,){

    }
    gotoLoginn(){
this.route.navigate(['test-login'])
    }
}
