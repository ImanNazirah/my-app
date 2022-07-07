import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Spotify } from '../models/spotify';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageableResponseModel, ResponseModel, SingleDataResponseModel } from '../models/response';
import { catchError, tap } from 'rxjs/operators';
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

  getPageable(): Observable<Pageable>{
    return this._pageable$.asObservable();
  }

  setPageable(pageable: Pageable){
    return this._pageable$.next(pageable);
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

    return this._http.post<SingleDataResponseModel<Spotify>>(baseUrl,payload).pipe(
      catchError(err => {
        console.log('Error createData SpotifyService : ',err);
        throw Observable.throw;
      })
    );

  }

  updateData(id: number, payload: Spotify): Observable<SingleDataResponseModel<Spotify>> {

    return this._http.put<SingleDataResponseModel<Spotify>>(baseUrl+'/'+id,payload).pipe(
      catchError(err => {
          console.log('Error updateData SpotifyService : ',err);
          throw Observable.throw;
        })
    );

  }

  deleteData(id: number): Observable<SingleDataResponseModel<Spotify>> {
    return this._http.delete<SingleDataResponseModel<Spotify>>(baseUrl+'/'+id);
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
        tap((x:PageableResponseModel<Spotify>)=>{

          this.defaultPageable.length = x.data?.totalElements;
          this.defaultPageable.pageIndex = x.data?.number;
          this.defaultPageable.pageSize = x.data?.size;

          this.setPageable(this.defaultPageable);
          
        }),
        catchError(err => {
          console.log('Error getByQueryData : ',err);
          throw Observable.throw;
        })     
        )
  
  }


}
