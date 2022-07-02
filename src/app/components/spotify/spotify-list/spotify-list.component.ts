import { Component, OnInit } from '@angular/core';
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

  createData : Spotify;
  putData : Spotify;

  //Sample AG grid 
  columnDefs = [
    { headerName: 'Track Name', field: 'track_name' },
    { headerName: 'Artist Name', field: 'artist_name' },
    { headerName: 'Genre', field: 'genre' },
    { headerName: 'Popularity', field: 'popularity' },
  ];

  rowData = [
    { track_name: '7 Rings', artist_name: 'Ariana Grande', genre: 'Pop Song', popularity: 69 },
    { track_name: 'Safe & sound', artist_name: 'Capital Cities', genre: 'Rap', popularity: 79 },
    { track_name: 'Porsche', artist_name: 'Boxter', genre: 'EDM', popularity: 99 }
  ];
  responseData: any;

  constructor(
    private _spotifyService: SpotifyService
  ) {
        //testing create data
        this.createData = new Spotify();
        this.createData.artistName ='Iman Testing artistName';
        this.createData.genre ='Pop';
        this.createData.popularity =77;
        this.createData.trackName ='Iman Testing trackname';

        //testing update data
        this.putData = new Spotify();
        this.putData.artistName ='Iman Testing artistName 1';
        this.putData.genre ='Trance';
        this.putData.popularity =77;
        this.putData.trackName ='Iman Testing trackname 1';
   }

  ngOnInit(): void {
    this.getAllSpotify();
  }

  getAllSpotify(): void {

    this._spotifyService.getAll()
      .pipe(
        // tap(response => console.log('Response :: ', response)),
        map((response: ResponseModel<Spotify>) => response.data),
        // tap(response => console.log('After Map :: ', response)),
      ).subscribe(x => {
        console.log('Spotify List getAll:: ', x);

    });

    this._spotifyService.getByQueryData(0,10)
    .pipe(
      map((response: PageableResponseModel<Spotify>) => response.data)
    ).subscribe(x => {
      console.log('Spotify List getByQueryData:: ', x);

    });

    //==============================
    //Testing 
    //==============================

    //Post data
    // this._spotifyService.createData(this.createData).subscribe(
    //   resp=>{
    //     console.log("Showing data response upon create:::",resp);

    //   }
    // );


    //Get by id
    // this._spotifyService.getById(19)
    // .pipe(
    //   map((response: SingleDataResponseModel<Spotify>) => response.data)
    // ).subscribe(x => {
    //   console.log('Iman get by id:: ', x);

    // });

    //Update data
    // this._spotifyService.updateData(19,this.putData).subscribe(
    //   resp=>{
    //     console.log("Showing data response upon update:::",resp);

    //   }
    // );

    //Delete data
    // this._spotifyService.deleteData(17).subscribe(
    //   resp=>{
    //     console.log("Showing delete response:::",resp);

    //   }
    // );


  }

}
