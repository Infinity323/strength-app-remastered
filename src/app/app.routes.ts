import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { RecordsComponent } from './records/records.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';

export const routes: Routes = [
  { path: '', component: MyDashboardComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'records', component: RecordsComponent },
];
