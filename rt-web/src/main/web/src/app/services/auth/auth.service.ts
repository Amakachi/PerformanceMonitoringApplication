import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { fillSessionVariables, link } from 'src/app/constants/constants';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/iuser';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSession: IUser;

  constructor(private http: HttpClient, private userService: UserService) { }

  authenticate(formData: FormData): Observable<IUser> {
    return this.http.post<any>(link.login,
      formData,
      { observe: 'response', withCredentials: true })
      .pipe(
        switchMap((response: HttpResponse<any>) => {
          return this.setUserSession();
        })
      ).pipe(
        map((user: IUser) => {
          this.userSession = user;
          sessionStorage.setItem('userSession', JSON.stringify(this.userSession));
          this.userService.setUserInfo(this.userSession);
          return user;
        })
      );
  }

  setUserSession(): Observable<IUser> {
    return this.http.get<IUser>(fillSessionVariables.apiUrl, { withCredentials: true });
  }

  clearUserSession(): Observable<HttpResponse<any>> {
    return this.http.get<any>(link.logout, {
      observe: 'response',
      withCredentials: true
    });
  }

  logout(): Observable<HttpResponse<any>> {
    return this.clearUserSession().pipe(
      map(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            sessionStorage.removeItem('userSession');
            return response;
          }
        })
    );
  }
}
