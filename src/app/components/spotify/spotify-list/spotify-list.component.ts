import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PageableResponseModel, ResponseModel, SingleDataResponseModel } from 'src/app/models/response';
import { Spotify } from 'src/app/models/spotify';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Pageable } from 'src/app/models/pageable';

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

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  // @ViewChild(MatSort) sort: MatSort;

  pageable : Pageable;

  constructor(
    private _spotifyService: SpotifyService
  ) {

        //to pass query param
        this.queryParam = new Spotify();
        // this.queryParam.genre ='Pop';
        // this.queryParam.artistName =undefined;

        this.pageable = new Pageable();

        //get data with query
        this._spotifyService.getByQueryData(0,10,this.queryParam)
        .pipe(
          map((response: PageableResponseModel<Spotify>) => response.data)
        )
        .subscribe(x => {

          //to display data in table
          this.viewListing$ = x?.content;
          this.dataSource = new MatTableDataSource(this.viewListing$);

          //to pass pagination 
          this.pageable.length = x?.totalElements;
          this.pageable.pageIndex = x?.number;
          this.pageable.pageSize =  x?.size;

        });

    }

  ngOnInit(): void {
    
  }

  // ngAfterViewInit() {
    
  // }

  public handlePage(e: PageEvent) {

     //get data with query upon clicking mat paginator
     this._spotifyService.getByQueryData(e.pageIndex,e.pageSize,this.queryParam)
     .pipe(
       map((response: PageableResponseModel<Spotify>) => response.data)
     )
     .subscribe(x => {

       //to display data in table
       this.viewListing$ = x?.content;
       this.dataSource = new MatTableDataSource(this.viewListing$);

       //to pass pagination 
       this.pageable.length = x?.totalElements;
       this.pageable.pageIndex = x?.number;
       this.pageable.pageSize =  x?.size;

     });

  }

}
