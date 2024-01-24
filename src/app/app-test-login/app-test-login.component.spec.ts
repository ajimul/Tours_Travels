import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTestLoginComponent } from './app-test-login.component';

describe('AppTestLoginComponent', () => {
  let component: AppTestLoginComponent;
  let fixture: ComponentFixture<AppTestLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTestLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppTestLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
