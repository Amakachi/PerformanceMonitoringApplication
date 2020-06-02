import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { UserService } from '../services/user/user.service';
import { PartnerService } from '../services/partner/partner.service';
import { NotificationService } from '../services/notification/notification.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SocketclientService } from '../services/socketClient/socketclient.service';
import { first } from 'rxjs/operators';
import { SocketClientState } from '../services/socketClient/clientstate';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {

  public userFullName = 'Usman Dan-Fodio';
  public isEcoBankUser: boolean;
  public partners: {name: string, link: string}[] = [
    {name: 'ALIPAY', link: '/app/partners/alipay'},
   /* {name: 'NIBSS', link: '/app/partners/nibss'},
    {name: 'EQUITY BANK', link: '/app/partners/equitybank'}*/
  ];


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private partnerService: PartnerService,
    private notificationService: NotificationService,
    private socketClient: SocketclientService,
    ) { }


  ngOnInit(): void {

    

    this.socketClient.initiateSocket();
  
    if (this.userService.getUserInfo()) {
    const userData = this.userService.getUserInfo();
    const roleName =  userData.roles[0].roleName;
      this.isEcoBankUser = roleName.includes('ECO')
      
      this.partnerService.setCompanyOfLoggedInUser(userData);
      this.userFullName = userData.email || this.userFullName;
    }

    // this.isEcoBankUser = this.partnerService.getCompanyOfLoggedInUser() == 'ECOBANK';
  }


  ngOnDestroy(): void {
    this.socketClient.connect().pipe(first()).subscribe(inst => {
      if (inst) { inst.disconnect(null); }
    });
    this.socketClient.state.next(SocketClientState.ATTEMPTING);
  }


  handlePasswordReset() {
    this.router.navigate(['/app', 'resetpassword']);
  }

  handleLogout() {
    this.authService.logout().subscribe(
      (response: HttpResponse<any>) => {
          if (response.status === 200) {
            sessionStorage.removeItem('userSession');
            this.router.navigate(['/auth']);
            this.notificationService.showNotificationLite('success', 'You have logged out successfully');

          }
      },
    (error) => {
      console.log(error);
      sessionStorage.removeItem('userSession');
      this.router.navigate(['/auth']);
    });
  }

}

