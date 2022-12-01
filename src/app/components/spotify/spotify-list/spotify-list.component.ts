import { AfterViewInit, Component, OnInit, ViewChild,Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PageableResponseModel, ResponseModel, SingleDataResponseModel } from 'src/app/models/response';
import { Spotify } from 'src/app/models/spotify';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Pageable } from 'src/app/models/pageable';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SpotifyCreateComponent } from '../spotify-create/spotify-create.component';
import { SpotifyUpdateComponent } from '../spotify-update/spotify-update.component';

@Component({
  selector: 'app-spotify-list',
  templateUrl: './spotify-list.component.html',
  styleUrls: ['./spotify-list.component.scss']
})
export class SpotifyListComponent implements OnInit {

  title = 'app';

  public viewListing$: Spotify[] = [];
  queryParam :Spotify;

  //Angular Material Table
  displayedColumns: string[] = ['artistName', 'trackName', 'genre','action'];
  dataSource : MatTableDataSource<Spotify> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  // @ViewChild(MatSort) sort: MatSort;

  inputSearch:string='';

  pageable : Pageable;

  constructor(
    private _spotifyService: SpotifyService,
    private dialog: MatDialog
  ) {

        //to pass query param
        this.queryParam = new Spotify();
        // this.queryParam.genre ='Pop';
        // this.queryParam.artistName =undefined;

        this.pageable = new Pageable();

        this._spotifyService.getSpotifyList().subscribe((x:Spotify[])=>{
          this.viewListing$ = x;
        })
        //get data with query
        this._spotifyService.getByQueryData(0,10,this.queryParam)
        .pipe(
          map((response: PageableResponseModel<Spotify>) => response.data)
        )
        .subscribe(x => {

          //to display data in table
          this.setTableListing(x.content);


        });

        this._spotifyService.getPageable().subscribe((x:Pageable)=>{
            this.pageable = x;
        })



    }

  ngOnInit(): void {
    
  }

  // ngAfterViewInit() {
    
  // }

  public handlePage(e: PageEvent): void {

     //get data with query upon clicking mat paginator
     this._spotifyService.getByQueryData(e.pageIndex,e.pageSize,this.queryParam)
     .pipe(
       map((response: PageableResponseModel<Spotify>) => response.data)
     )
     .subscribe(x => {

       //to display data in table
       this.setTableListing(x.content);


     });

  }

  public applyFilter(event: Event): void {

    let inputEl = event.target as HTMLInputElement;
    this.inputSearch = inputEl.value;
    this.queryParam.artistName = this.inputSearch;

    if(this.inputSearch == ''){
      this.queryParam = new Spotify();
    }
  
    //get data with query with pagination and input search
    this._spotifyService.getByQueryData(this.pageable.pageIndex,this.pageable.pageSize,this.queryParam)
    .pipe(
      map((response: PageableResponseModel<Spotify>) => response.data)
    )
    .subscribe(x => {

      //to display data in table
      this.setTableListing(x.content);

    });
    
  }

  public setTableListing(spotifyList:Spotify[]):MatTableDataSource<Spotify>{

    this.viewListing$ = spotifyList;
    this.dataSource = new MatTableDataSource(this.viewListing$);
    return this.dataSource;
  }

  createDialog(): void {
    let dialogRef = this.dialog.open(SpotifyCreateComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result:Spotify) => {

      if(result){

        //Post request payload
        this._spotifyService.createData(result).subscribe(
          resp=>{
            console.log("Showing data response upon create:::",resp);
            //to display data in table
            this.setTableListing(this.viewListing$);
          }
        );
      }

    });

  }

  editData(details:Spotify){

    let dialogRef = this.dialog.open(SpotifyUpdateComponent, {
      width: '350px',
      data: details
    });

    dialogRef.afterClosed().subscribe((result:Spotify) => {
      
      if(result){

        //Put request payload
        this._spotifyService.updateData(details.id,result).subscribe(
          resp=>{
            console.log("Showing data response upon update:::",resp);
            //to display data in table
            this.setTableListing(this.viewListing$);
          }
        );
      }

    });
    
  }

  deleteData(details:Spotify){
    //Delete data
    this._spotifyService.deleteData(details.id).subscribe(
      resp=>{
        console.log("Showing delete response:::",resp);
        //to display data in table
        this.setTableListing(this.viewListing$);
      }
    );

  }

}
