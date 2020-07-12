import { Component, OnInit } from '@angular/core';
import { DataFetchService } from '../services/data-fetch.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  selectedCountry = 'Portugal';

  countryData: any;
  timeSeriesData: any[] = [];

  constructor(private dataFetch: DataFetchService) {}

  ngOnInit(): void {
    this.dataFetch.getCountryData(this.selectedCountry).subscribe((data) => {
      this.countryData = data[0];
    });
    this.dataFetch.getTimeSeriesData().subscribe((data) => {
      const list = data.split('\n');
      list.forEach((e) => {
        this.timeSeriesData.push(e);
      });
    });
  }
}
