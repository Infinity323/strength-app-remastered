import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { OpenplService, Rankings } from '../service/openpl.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.scss',
})
export class RankingsComponent implements OnInit {
  isLoading: boolean;
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

  // sort: Sort;

  units: string = 'lbs';

  pageEvent: PageEvent = new PageEvent();
  length: number = 100000;
  pageSize: number = 20;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [20, 50, 100];

  constructor(private openplService: OpenplService) {}

  ngOnInit(): void {
    console.log('Begin fetching rankings.');
    this.isLoading = true;
    this.openplService.getRows().subscribe((resp: Rankings) => {
      this.rows = resp.rows;
      this.isLoading = false;
      console.log('Finished fetching rankings.');
    });

    this.pageEvent.length = this.length;
    this.pageEvent.pageSize = this.pageSize;
    this.pageEvent.pageIndex = this.pageIndex;
  }

  handleSort(sort: Sort) {
    console.log(sort.active);
    console.log(sort.direction);
  }

  handlePageEvent(e: PageEvent) {
    console.log('Begin fetching next page of rankings.');
    this.isLoading = true;
    this.openplService
      .getUpdatedRows(this.units, e)
      .subscribe((resp: Rankings) => {
        this.rows = resp.rows;
        this.pageEvent = e;
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
        this.isLoading = false;
        console.log('Finished fetching next page of rankings.');
      });
  }

  handleUnitChange() {
    console.log('Begin fetching next page of rankings.');
    this.isLoading = true;
    this.openplService
      .getUpdatedRows(this.units, this.pageEvent)
      .subscribe((resp: Rankings) => {
        this.rows = resp.rows;
        this.isLoading = false;
        console.log('Finished fetching next page of rankings.');
      });
  }
}
