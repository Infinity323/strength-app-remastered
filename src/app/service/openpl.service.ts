import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';

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

  getRows() {
    let params = new HttpParams();
    params = params.append('start', 0);
    params = params.append('end', 99);
    params = params.append('lang', 'en');
    params = params.append('units', 'lbs');

    return this.http.get<Rankings>(FULLY_TESTED_URL, {
      headers: headers,
      params: params,
    });
  }
}
