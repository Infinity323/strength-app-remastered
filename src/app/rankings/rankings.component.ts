import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { OpenplService, Rankings } from '../service/openpl.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
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

  sortBy: string;

  sex: string = 'all';
  weight: string = 'all';

  units: string = 'lbs';

  pageEvent: PageEvent = new PageEvent();
  length: number = 100000;
  pageSize: number = 20;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [20, 50, 100];

  constructor(
    private openplService: OpenplService,
    public filterDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sortBy = 'dots';
    
    this.pageEvent.length = this.length;
    this.pageEvent.pageSize = this.pageSize;
    this.pageEvent.pageIndex = this.pageIndex;

    console.log('Begin fetching rankings.');
    this.isLoading = true;
    this.openplService
      .getRankings(this.units, this.pageEvent, this.sex, this.weight, this.sortBy)
      .subscribe((resp: Rankings) => {
        this.rows = resp.rows;
        this.isLoading = false;
        console.log('Finished fetching rankings.');
      });
  }

  openFilterDialog() {
    const dialogRef = this.filterDialog.open(FilterDialogComponent, {
      width: '500px',
      data: { sex: this.sex, weight: this.weight },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Sex changed to: ' + result.sex);
        console.log('Weight class changed to: ' + result.weight);
        console.log('Begin fetching filtered rankings.');
        this.sex = result.sex;
        this.weight = result.weight;
        this.isLoading = true;
        this.openplService
          .getRankings(this.units, this.pageEvent, this.sex, this.weight, this.sortBy)
          .subscribe((resp: Rankings) => {
            this.rows = resp.rows;
            this.isLoading = false;
            console.log('Finished fetching filtered rankings.');
          });
      }
    });
  }

  handleSort(sort: Sort) {
    this.sortBy = sort.active;

    console.log('Begin fetching rankings after sort.');
    this.isLoading = true;
    this.openplService
      .getRankings(this.units, this.pageEvent, this.sex, this.weight, this.sortBy)
      .subscribe((resp: Rankings) => {
        this.rows = resp.rows;
        this.isLoading = false;
        console.log('Finished fetching rankings after sort.');
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    console.log('Begin fetching next page of rankings.');
    this.isLoading = true;
    this.openplService
      .getRankings(this.units, this.pageEvent, this.sex, this.weight, this.sortBy)
      .subscribe((resp: Rankings) => {
        this.rows = resp.rows;
        this.isLoading = false;
        console.log('Finished fetching next page of rankings.');
      });
  }

  handleUnitChange() {
    console.log('Begin fetching rankings after unit change.');
    this.isLoading = true;
    this.openplService
      .getRankings(this.units, this.pageEvent, this.sex, this.weight, this.sortBy)
      .subscribe((resp: Rankings) => {
        this.rows = resp.rows;
        this.isLoading = false;
        console.log('Finished fetching rankings after unit change.');
      });
  }
}
