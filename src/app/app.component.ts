import { Component } from '@angular/core';
import { GifsService } from './gifs/services/gifs.service';
import { Gif } from './gifs/interfaces/gifs.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gifs-app';

  constructor( private gifsService:GifsService ) {};

  get gifs():Gif[] {
    return this.gifsService.gifsList;
  };

}
