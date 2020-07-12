import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { getLocaleDateFormat } from '@angular/common';

const BASE_URL = '/api';
const TIME_SERIES_GLOBAL_URL =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

@Injectable({
  providedIn: 'root',
})
export class DataFetchService {
  constructor(private http: HttpClient) {}

  getSummaryData() {
    return this.http.get(BASE_URL);
  }

  getCountryData(country) {
    return this.http.get(`${BASE_URL}/country/${country}`);
  }

  getTimeSeriesData() {
    return this.http.get(TIME_SERIES_GLOBAL_URL, { responseType: 'text' });
  }
}
