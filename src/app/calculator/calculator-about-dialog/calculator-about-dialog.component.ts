import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calculator-about-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './calculator-about-dialog.component.html',
  styleUrl: './calculator-about-dialog.component.scss'
})
export class CalculatorAboutDialogComponent {
  constructor(public dialogRef: MatDialogRef<CalculatorAboutDialogComponent>) {}
}
