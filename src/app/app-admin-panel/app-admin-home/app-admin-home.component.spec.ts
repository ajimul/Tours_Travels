import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAdminHomeComponent } from './app-admin-home.component';

describe('AppAdminHomeComponent', () => {
  let component: AppAdminHomeComponent;
  let fixture: ComponentFixture<AppAdminHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAdminHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
