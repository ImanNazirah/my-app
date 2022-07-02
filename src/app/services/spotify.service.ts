import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Spotify } from '../models/spotify';
import { Observable } from 'rxjs';
import { PageableResponseModel, ResponseModel, SingleDataResponseModel } from '../models/response';
import { catchError } from 'rxjs/operators';

const baseUrl = '/api/spotify';
// const baseUrl = 'http://localhost:8080/spotify';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private _http: HttpClient) { }

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

  getByQueryData(page: number = 0, pageSize: number = 10):Observable<PageableResponseModel<Spotify>>{

      const header = {
          params: {
              page        : '' + page,
              pageSize    : '' + pageSize
          }
      }

      return this._http.get<PageableResponseModel<Spotify>>(baseUrl+'/search', header);
  
  }


}
