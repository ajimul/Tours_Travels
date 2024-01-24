import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { AppHeroComponent } from "../app-hero/app-hero.component";
import { AppItineraryListComponent } from "../app-itinerary-list/app-itinerary-list.component";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
    selector: 'app-app-pages-default',
    standalone: true,
    templateUrl: './app-pages-default.component.html',
    styleUrl: './app-pages-default.component.css',
    imports: [AppHeroComponent, AppItineraryListComponent,]
})
export class AppPagesDefaultComponent {
constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router) {

  }


 
  
  ngOnInit() {
    this.route.url.subscribe(segments => {
      console.log('Current URL segments:', segments);
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Do something when navigation ends
        console.log('Navigation ended:', event);
      }
    });
  }
  
}
