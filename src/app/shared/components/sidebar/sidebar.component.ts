import { Component } from '@angular/core';
import { Offcanvas } from 'bootstrap';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService:GifsService ) {
    const initOffCanvas = Offcanvas;
  };

  get tags():string[] {
    return this.gifsService.tagsHistory;
  };

  searchTag( tag:string ):void {
    this.gifsService.searchTagService( tag );
  };

  deleteHistoryService() {
    this.gifsService.deleteHistory();
  };

}
