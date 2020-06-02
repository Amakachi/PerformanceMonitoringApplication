import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestclientService {

  constructor(private http: HttpClient) { }

  funcGet(url: string): Observable<any> {
    return this.http.get<any>(url,{ withCredentials: true });
  }

  funcPost(data: any, url: string,params?: HttpParams): Observable<any> {
    return this.http.post<any>(url, data,{ withCredentials: true,params });
  }


}
