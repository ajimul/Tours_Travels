import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPagesNavigationComponent } from './app-pages-navigation.component';

describe('AppPagesNavigationComponent', () => {
  let component: AppPagesNavigationComponent;
  let fixture: ComponentFixture<AppPagesNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPagesNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPagesNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
