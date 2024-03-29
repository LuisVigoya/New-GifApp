import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList:Gif[] = [];

  private _tagsHistory:string[] = [];
  private apiKey:string = 'arRnMfdV15O6fLemmiTK6diMLLOBhcY2';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';
  private sizeGifs:number = 10;

  constructor( private http:HttpClient ) {
    this.loadLocalStorage();
  };

  get tagsHistory():string[] {
    return [...this._tagsHistory];
  };

  sizeListGifs( number:number ) {
    this.sizeGifs = number;
  }

  private organizeHistory( tag:string ) {
    tag = tag.toLowerCase().trim();
    if( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this.tagsHistory.filter( (oldTag) => oldTag !== tag );
    }
    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  };

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  };

  private loadLocalStorage( limit?:number ):void {
    if( !localStorage.getItem( 'history' ) ) return;
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
    this.searchTagService( this._tagsHistory[0], limit );
  };

  searchTagService( tag:string, limit?:number ):void {
    if( tag.length === 0 ) return;
    this.sizeGifs = limit || 10;
    this.organizeHistory( tag );

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('lang', 'es')
      .set('limit', `${this.sizeGifs}`)
      .set('q', tag)
      .set('rating', 'g')

    this.http.get<SearchResponse>( `${ this.serviceUrl }/search`, { params } )
      .subscribe( resp => {
        this.gifsList = resp.data;
      });
  };

  deleteHistory() {
    localStorage.clear();
    this._tagsHistory = [];
    this.gifsList = [];
  };

  newLimitSearch( limit:number ):void {
    this.loadLocalStorage( limit );
  };

}
