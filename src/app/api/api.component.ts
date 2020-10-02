import { Component, ElementRef,  OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  apiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
  searchResult: any = {};
  @ViewChild('search') searchBox: ElementRef<HTMLInputElement>;

  constructor(public http: HttpClient) {  }

  ngOnInit() { }

  startSearch () {
    const searchTerm = this.searchBox.nativeElement.value;

    this.http.get( this.apiUrl + searchTerm ).subscribe((res)=> {
      console.log(res);
      this.searchResult = res;
    })
  }
}