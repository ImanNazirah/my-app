import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Spotify } from '../models/spotify';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageableResponseModel, ResponseModel, SingleDataResponseModel } from '../models/response';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pageable } from '../models/pageable';


// const baseUrl = '/api/spotify';
const baseUrl = environment.api_local+'/spotify';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private defaultPageable : Pageable = new Pageable();
 
  private _pageable$ : BehaviorSubject<Pageable> = new BehaviorSubject<Pageable>(this.defaultPageable);

  private spotifyList : Spotify[] = [];
 
  private _spotifyList$ : BehaviorSubject<Spotify[]> = new BehaviorSubject<Spotify[]>(this.spotifyList);

  getPageable(): Observable<Pageable>{
    return this._pageable$.asObservable();
  }

  setPageable(pageable: Pageable){
    return this._pageable$.next(pageable);
  }

  getSpotifyList(): Observable<Spotify[]>{
    return this._spotifyList$.asObservable();
  }

  setSpotifyList(spotifylist: Spotify[]){
    return this._spotifyList$.next(spotifylist);
  }

  constructor(private _http: HttpClient) { 
  }

  getAll(): Observable<ResponseModel<Spotify>> {
    return this._http.get<ResponseModel<Spotify>>(baseUrl);
  }

  getById(id: number):  Observable<SingleDataResponseModel<Spotify>> {
    return this._http.get<SingleDataResponseModel<Spotify>>(baseUrl+'/'+id);
  }

  createData(payload: Spotify): Observable<SingleDataResponseModel<Spotify>> {

    return this._http.post<SingleDataResponseModel<Spotify>>(baseUrl,payload)
    .pipe(
      map((x:SingleDataResponseModel<Spotify>)=>{
        
        // Update the newly data list
        let newList = [x.data, ...this._spotifyList$.value];;

        //set the newly list
        this.setSpotifyList(newList);

        //set new pageable
        this.defaultPageable.length = this._pageable$.value.length + 1;
        this.defaultPageable.pageIndex = this._pageable$.value.pageIndex;
        this.defaultPageable.pageSize = this._pageable$.value.pageSize;
        this.setPageable(this.defaultPageable);
 
        return x;
      }),
      catchError(err => {
        console.log('Error createData SpotifyService : ',err);
        throw Observable.throw;
      })
    );

  }

  updateData(id: number, payload: Spotify): Observable<SingleDataResponseModel<Spotify>> {

    return this._http.put<SingleDataResponseModel<Spotify>>(baseUrl+'/'+id,payload)
    .pipe(
      map((x:SingleDataResponseModel<Spotify>)=>{
        
          //idex of specified id
          let index = this._spotifyList$.value.findIndex(function(element) {
            return element.id === id;
          });
          // Update the data
          this._spotifyList$.value[index] = { ...this._spotifyList$.value[index], ...x.data};

          //set the newly list
          this.setSpotifyList(this._spotifyList$.value);

          return x;
   
      }),
      catchError(err => {
          console.log('Error updateData SpotifyService : ',err);
          throw Observable.throw;
        })
    );

  }

  deleteData(id: number): Observable<SingleDataResponseModel<Spotify>> {
    return this._http.delete<SingleDataResponseModel<Spotify>>(baseUrl+'/'+id)
    .pipe(
      map((x:SingleDataResponseModel<Spotify>)=>{

        // idex of specified id
        let index = this._spotifyList$.value.findIndex(function(element) {
          return element.id === id;
        });
        
        // slice index with specified id
        let newList = [...this._spotifyList$.value.slice(0, index), ...this._spotifyList$.value.slice(index + 1)];
        
        //set the newly list
        this.setSpotifyList(newList);

        //set new pageable
        this.defaultPageable.length = this._pageable$.value.length - 1;
        this.defaultPageable.pageIndex = this._pageable$.value.pageIndex;
        this.defaultPageable.pageSize = this._pageable$.value.pageSize;
        this.setPageable(this.defaultPageable);

        return x;
      }),
      catchError(err => {
          console.log('Error delete SpotifyService : ',err);
          throw Observable.throw;
        })
    );
  }

  getByQueryData(page: number = 0, pageSize: number = 10, spotify:Spotify):Observable<PageableResponseModel<Spotify>>{

      const header = {
          params: {
              page        : '' + page,
              pageSize    : '' + pageSize,
              artistName  : ''+ spotify.artistName
          }
      }

      if(spotify.artistName == undefined){
        delete (<any>header).params.artistName;// to handle : The operand of a 'delete' operator must be optional.
      }

      return this._http.get<PageableResponseModel<Spotify>>(baseUrl+'/search', header)
      .pipe(
        map((x:PageableResponseModel<Spotify>)=>{

          this.defaultPageable.length = x.data.totalElements;
          this.defaultPageable.pageIndex = x.data.number;
          this.defaultPageable.pageSize = x.data.size;

          this.setPageable(this.defaultPageable);
          this.setSpotifyList(x.data.content);

          return x;
        }),
        catchError(err => {
          console.log('Error getByQueryData : ',err);
          throw Observable.throw;
        })     
        )
  
  }


}
