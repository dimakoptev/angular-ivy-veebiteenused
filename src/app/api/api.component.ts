import { Component, ElementRef,  OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  apiUrl = 'https://et.wikipedia.org/api/rest_v1/feed/featured/';//siit otsime
  searchApi = 'https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=&format=json'
  searchResult: any;
  searchImage : string;//määrame sisu
  searchList : any;
  timestamp: any;
  

  @ViewChild('search') searchBox: ElementRef<HTMLInputElement>;//deklareerime elemendid
  @ViewChild('search1') searchBox1: ElementRef<HTMLInputElement>;
  @ViewChild('search2') searchBox2: ElementRef<HTMLInputElement>;


  constructor(public http: HttpClient) {  }

  ngOnInit() { }

  startSearch () {
    const searchTerm = this.searchBox.nativeElement.value +"/"+ 
    this.searchBox1.nativeElement.value +"/"+ 
    this.searchBox2.nativeElement.value;//otsing koosneb kolmest tegurist

    this.http.get( this.apiUrl + searchTerm).subscribe((res)=> {
      console.log(res);
      this.searchResult = res;
      this.searchList = this.searchResult.mostread;
      this.searchImage = this.searchResult.thumbnail ? this.searchResult.thumbnail.source: undefined;//? tähendab or statementi
      this.timestamp = this.searchResult.date;
      //mul oli pikalt probleem timestamp funktsiooniga, kuid peale deklareerimist on korras
      //kasutasin quick fix meetodit
    })
  }
  getImageUrl(page){//seda ei tea, miks see peab startseach-ist väljas olema
    return page.thumbnail ? page.thumbnail.source: undefined;
  }
}




// console.log(this.searchList);