import { Injectable } from '@angular/core';
import { updatePassword, resetPassword, resetPasswordRequest } from 'src/app/constants/constants';
import { RestclientService } from '../restclient/restclient.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/models/iresponse';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private userSession: any;

  constructor(private restClient: RestclientService) { }

  updatePassword(oldPassword: string, newPassword: string): Observable<IResponse> {
    this.userSession = JSON.parse(sessionStorage.getItem('userSession'));
    const link = updatePassword.apiUrl.replace('{id}', this.userSession.userId);
    const data: any = { oldPassword, newPassword };
    return this.restClient.funcPost(data, link).pipe(
      tap((response: IResponse) => console.log(response))
    );
  }

  resetPasswordRequest(email: string): Observable<IResponse> {
    const data: any = { email };
    return this.restClient.funcPost(data, resetPasswordRequest.apiUrl).pipe(
      tap((response: IResponse) => console.log(response))
    );
  }

  resetPassword(token: string, newPassword: string): Observable<IResponse> {
    const data: any = { newPassword };
    let params = new HttpParams();
    params = params.append('token', token);
    return this.restClient.funcPost(data, resetPassword.apiUrl, params).pipe(
      tap((response: IResponse) => console.log(response))
    );
  }
}
