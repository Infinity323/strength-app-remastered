import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { RankingsComponent } from './rankings/rankings.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';

export const routes: Routes = [
  { path: '', component: MyDashboardComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'rankings', component: RankingsComponent },
];
