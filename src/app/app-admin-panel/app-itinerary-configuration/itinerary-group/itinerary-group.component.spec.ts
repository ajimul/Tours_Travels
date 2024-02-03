import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryGroupComponent } from './itinerary-group.component';

describe('ItineraryGroupComponent', () => {
  let component: ItineraryGroupComponent;
  let fixture: ComponentFixture<ItineraryGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItineraryGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItineraryGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
