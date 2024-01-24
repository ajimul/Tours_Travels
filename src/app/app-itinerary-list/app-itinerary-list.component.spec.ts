import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppItineraryListComponent } from './app-itinerary-list.component';

describe('AppItineraryListComponent', () => {
  let component: AppItineraryListComponent;
  let fixture: ComponentFixture<AppItineraryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppItineraryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppItineraryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
