import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorAboutDialogComponent } from './calculator-about-dialog.component';

describe('CalculatorAboutDialogComponent', () => {
  let component: CalculatorAboutDialogComponent;
  let fixture: ComponentFixture<CalculatorAboutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorAboutDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalculatorAboutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
