import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

export interface Rankings {
  total_length: number;
  rows: [[]];
}

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

const FULLY_TESTED_URL: string = '/rankings/raw/fully-tested';

@Injectable({
  providedIn: 'root',
})
export class OpenplService {
  constructor(private http: HttpClient) {}

  getRankings(units: string, e: PageEvent, sex: string, weight: string, sortBy: string) {
    let newStart = e.pageIndex * e.pageSize;

    let params = new HttpParams();
    params = params.append('start', newStart);
    params = params.append('end', newStart + e.pageSize - 1);
    params = params.append('lang', 'en');
    params = params.append('units', units);

    let newUrl = FULLY_TESTED_URL;
    if (sex != 'all') {
      newUrl += `/${sex}`;
    }
    if (weight != 'all') {
      newUrl += `/${weight}`;
    }
    if (sortBy != 'dots') {
      newUrl += `/by-${sortBy}`;
    }

    return this.http.get<Rankings>(newUrl, {
      headers: headers,
      params: params,
    });
  }
}
