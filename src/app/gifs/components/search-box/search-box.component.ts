import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-gifs-search-box',
  templateUrl: './search-box.component.html',
  styles: [

  ]
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor( private gifsService:GifsService ) {};

  searchTag() {
    const tagValue = this.tagInput.nativeElement.value;
    this.gifsService.searchTagService( tagValue );
    this.tagInput.nativeElement.value = '';
  };

}
