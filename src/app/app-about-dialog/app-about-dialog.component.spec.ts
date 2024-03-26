import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAboutDialogComponent } from './app-about-dialog.component';

describe('AppAboutDialogComponent', () => {
  let component: AppAboutDialogComponent;
  let fixture: ComponentFixture<AppAboutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAboutDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppAboutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
