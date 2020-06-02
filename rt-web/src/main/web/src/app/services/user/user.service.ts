import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  next(data: any): void {
    throw new Error("Method not implemented.");
  }

  public user: IUser;

  constructor() { }

  getUserInfo() {
    let userSession = sessionStorage.getItem("userSession")
    let userSessionData = JSON.parse(userSession)

    console.log(userSessionData);

    if(userSessionData != null && userSessionData.email !== null) {
      this.user = userSessionData
    }
    return this.user;
  }

  setUserInfo(info){
   
    this.user = info;
    console.log(this.user);
    this.user.roles = info.roles
     //  set  user to local storage

  }

  getRole() {
    if(this.user.hasOwnProperty("roles")){
      return this.user.roles;
     
    }
    return [];
  }

}
