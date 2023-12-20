import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSitemapComponent } from './app-sitemap.component';

describe('AppSitemapComponent', () => {
  let component: AppSitemapComponent;
  let fixture: ComponentFixture<AppSitemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSitemapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppSitemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
