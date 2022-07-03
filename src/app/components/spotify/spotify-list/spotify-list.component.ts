import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PageableResponseModel, ResponseModel, SingleDataResponseModel } from 'src/app/models/response';
import { Spotify } from 'src/app/models/spotify';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-spotify-list',
  templateUrl: './spotify-list.component.html',
  styleUrls: ['./spotify-list.component.scss']
})
export class SpotifyListComponent implements OnInit {

  title = 'app';

  public viewListing$: Spotify[] | undefined = [];
  queryParam :Spotify;

  //Angular Material Table
  displayedColumns: string[] = ['artistName', 'trackName', 'genre'];
  dataSource : MatTableDataSource<Spotify> = new MatTableDataSource();

  constructor(
    private _spotifyService: SpotifyService
  ) {

        //to pass query param
        this.queryParam = new Spotify();
        // this.queryParam.genre ='Pop';
        // this.queryParam.artistName =undefined;

        //get data with query
        this._spotifyService.getByQueryData(0,10,this.queryParam)
        .pipe(
          map((response: PageableResponseModel<Spotify>) => response.data)
        )
        .subscribe(x => {

          this.viewListing$ = x?.content;
          this.dataSource = new MatTableDataSource(this.viewListing$);

        });

    }

  ngOnInit(): void {
    
  }

}
