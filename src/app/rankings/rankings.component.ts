import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { OpenplService, Rankings } from '../service/openpl.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.scss',
})
export class RankingsComponent implements OnInit {
  isLoading: boolean = true;
  rows: object[] = [];
  displayedColumns: string[] = [
    'rank',
    'name',
    'location',
    'sex',
    'age',
    'weight',
    'class',
    'squat',
    'bench',
    'deadlift',
    'total',
    'dots',
  ];

  constructor(private openplService: OpenplService) {}

  ngOnInit(): void {
    console.log('Fetching rankings.');
    this.openplService.getRows().subscribe((resp: Rankings) => {
      this.rows = resp.rows;
      this.isLoading = false;
      console.log('Finished fetching rankings.');
    });
  }

  handleSort(sort: Sort) {
    console.log(sort.active);
    console.log(sort.direction);
  }
}
