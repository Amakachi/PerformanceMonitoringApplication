import {Component, OnInit, OnDestroy} from '@angular/core';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/iuser';
import {NotificationService} from '../../services/notification/notification.service';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loading = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  password =  new FormControl('', [Validators.required ]);


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email address';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  constructor(private authService: AuthService,
              private validateService: ValidateService,
              private router: Router,
              private notificationService: NotificationService,
              private userService: UserService,
              ) { }


  ngOnInit(): void {
    if(sessionStorage.getItem("userSession") !== null) {
      this.router.navigateByUrl('/app')
    }
    //console.log(this.userService.getUserInfo())
    console.log(sessionStorage.getItem("userSession"))
   }

  
  login(): void {
    if (this.email.value.trim()  === '' || this.password.value.trim() === '') {
      return;
    }
    this.loading = true;
    this.validateService.validateFields([
      { name: 'email', value: this.email },
      { name: 'password', value: this.password }
    ]);

    const data = new FormData();
    data.append('username', this.email.value);
    data.append('password', this.password.value);

    this.authService.authenticate(data).subscribe((user: IUser) => {
      this.loading = false;
      if (!user) {
        this.notificationService.showNotificationLite('info', 'Try again');
        return;
      }
      console.log(user);
      this.notificationService.showNotificationLite('success', 'You have logged in successfully');
      //this.router.navigate(['/app']);

      const roleName =  user.roles[0].roleName;
      let isEcoBankUser = roleName.includes('ECO');
      if (isEcoBankUser) {
        this.router.navigate(['/app/dashboard']);
      } 
      else {
        this.router.navigate(['/app/home']);
      }
    },
    (error) => {
      // tslint:disable-next-line:triple-equals
      this.loading = false;
      if (error.status === 401) {
        this.notificationService.showNotificationLite('warning', 'Invalid username or password');
      } else {
        this.notificationService.showNotificationLite('danger', 'Login Unsuccessful');
      }

    });
  }

  


}
