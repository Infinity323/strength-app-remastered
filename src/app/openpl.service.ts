import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Rankings {
  total_length: number;
  rows: [[]];
}

const options = {
  mode: 'no-cors',
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Request-Methods': 'GET',
    'Access-Control-Request-Headers': 'Origin, Content-Type'
  }),
};

@Injectable({
  providedIn: 'root',
})
export class OpenplService {
  constructor(private http: HttpClient) {}

  getRows() {
    return this.http.get<Rankings>(
      'https://www.openpowerlifting.org/api/rankings/raw/fully-tested?start=0&end=99&lang=en&units=lbs',
      options
    );
  }
}
