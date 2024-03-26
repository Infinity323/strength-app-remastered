import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CalculatorAboutDialogComponent } from './calculator-about-dialog/calculator-about-dialog.component';

const MAX_WEIGHT: number = 2000;
const CATEGORIES: string[] = [
  'Crippled',
  'Noob',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Elite',
  'Freak',
];

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSlideToggleModule,
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  MAX_WEIGHT: number = MAX_WEIGHT;
  CATEGORIES: string[] = CATEGORIES;

  // toggles
  calculated: boolean = false;
  splitInputs: boolean = false;

  // inputs
  units: string = 'LB';
  squat: number = 0;
  bench: number = 0;
  deadlift: number = 0;
  total: number = 0;
  bw: number = 0;
  sex: string = 'M';

  // internal variables
  squatDiv: number[] = [];
  benchDiv: number[] = [];
  deadliftDiv: number[] = [];
  squatLevelIndex: number = 0;
  benchLevelIndex: number = 0;
  deadliftLevelIndex: number = 0;

  // screen variables
  dots: number = 0;
  squatRatio: number = 0;
  benchRatio: number = 0;
  deadliftRatio: number = 0;
  squatProgress: number = 0;
  benchProgress: number = 0;
  deadliftProgress: number = 0;

  constructor(public aboutDialog: MatDialog) {}

  openAboutDialog(): void {
    this.aboutDialog.open(CalculatorAboutDialogComponent, {
      width: '500px',
    });
  }

  calculate(): void {
    this.calculateDots();
    this.calculateCompetency();
    this.calculateProgress();
    this.calculated = true;
  }

  calculateDots(): void {
    let conversion = 1;
    let coefficients: number[];
    let tempBw: number = 0;
    let denominator: number = 0;

    if (this.splitInputs) {
      this.total = this.squat + this.bench + this.deadlift;
    }

    if (this.units == 'LB') {
      // LB to KG ratio
      conversion = 0.45359237;
    }

    if (this.sex == 'M') {
      coefficients = [
        -307.75076, 24.0900756, -0.1918759221, 0.0007391293, -0.000001093,
      ];
      tempBw = Math.min(Math.max(conversion * this.bw, 40), 210);
    } else {
      coefficients = [
        -57.96288, 13.6175032, -0.1126655495, 0.0005158568, -0.0000010706,
      ];
      tempBw = Math.min(Math.max(conversion * this.bw, 40), 150);
    }

    for (let i = 0; i < coefficients.length; i++) {
      denominator += coefficients[i] * tempBw ** i;
    }

    this.dots = (500 / denominator) * conversion * this.total;
  }

  calculateCompetency(): void {
    this.squatLevelIndex = 0;
    this.benchLevelIndex = 0;
    this.deadliftLevelIndex = 0;

    // Different progression standards between male and female
    if (this.sex == 'M') {
      this.squatDiv = [
        0,
        45,
        135,
        1.25 * this.bw,
        1.75 * this.bw,
        2.5 * this.bw,
        3 * this.bw,
        this.MAX_WEIGHT,
      ];
      this.benchDiv = [
        0,
        45,
        95,
        this.bw,
        1.5 * this.bw,
        2 * this.bw,
        2.25 * this.bw,
        this.MAX_WEIGHT,
      ];
      this.deadliftDiv = [
        0,
        45,
        135,
        1.5 * this.bw,
        2.25 * this.bw,
        3 * this.bw,
        3.5 * this.bw,
        this.MAX_WEIGHT,
      ];
    } else {
      this.squatDiv = [
        0,
        45,
        95,
        this.bw,
        1.5 * this.bw,
        1.75 * this.bw,
        2.25 * this.bw,
        this.MAX_WEIGHT,
      ];
      this.benchDiv = [
        0,
        0,
        45,
        0.5 * this.bw,
        0.75 * this.bw,
        this.bw,
        1.25 * this.bw,
        this.MAX_WEIGHT,
      ];
      this.deadliftDiv = [
        0,
        45,
        135,
        1.25 * this.bw,
        1.75 * this.bw,
        2.25 * this.bw,
        3 * this.bw,
        this.MAX_WEIGHT,
      ];
    }

    while (
      this.squatLevelIndex + 1 < this.squatDiv.length &&
      this.squat >= this.squatDiv[this.squatLevelIndex + 1]
    ) {
      this.squatLevelIndex++;
    }
    while (
      this.benchLevelIndex + 1 < this.benchDiv.length &&
      this.bench >= this.benchDiv[this.benchLevelIndex + 1]
    ) {
      this.benchLevelIndex++;
    }
    while (
      this.deadliftLevelIndex + 1 < this.deadliftDiv.length &&
      this.deadlift >= this.deadliftDiv[this.deadliftLevelIndex + 1]
    ) {
      this.deadliftLevelIndex++;
    }
  }

  calculateProgress(): void {
    // Calculate bodyweight ratio
    this.squatRatio = Math.round((this.squat / this.bw) * 100) / 100;
    this.benchRatio = Math.round((this.bench / this.bw) * 100) / 100;
    this.deadliftRatio = Math.round((this.deadlift / this.bw) * 100) / 100;

    // Calculate lift progressions
    let low: number = this.squatDiv[this.squatLevelIndex];
    let high: number = this.squatDiv[this.squatLevelIndex + 1];
    this.squatProgress = ((this.squat - low) / (high - low)) * 100;
    low = this.benchDiv[this.benchLevelIndex];
    high = this.benchDiv[this.benchLevelIndex + 1];
    this.benchProgress = ((this.bench - low) / (high - low)) * 100;
    low = this.deadliftDiv[this.deadliftLevelIndex];
    high = this.deadliftDiv[this.deadliftLevelIndex + 1];
    this.deadliftProgress = ((this.deadlift - low) / (high - low)) * 100;
  }
}
