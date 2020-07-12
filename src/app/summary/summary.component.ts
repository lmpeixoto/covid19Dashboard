import { Component, OnInit } from '@angular/core';
import { DataFetchService } from '../services/data-fetch.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  constructor(private dataFetch: DataFetchService) {}

  summary: any;

  ngOnInit(): void {
    this.dataFetch.getSummaryData().subscribe((data) => {
      this.summary = data;
    });
  }
}
