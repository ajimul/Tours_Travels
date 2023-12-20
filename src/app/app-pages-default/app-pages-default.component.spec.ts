import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPagesDefaultComponent } from './app-pages-default.component';

describe('AppPagesDefaultComponent', () => {
  let component: AppPagesDefaultComponent;
  let fixture: ComponentFixture<AppPagesDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPagesDefaultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPagesDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
