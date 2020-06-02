import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { PasswordService } from 'src/app/services/password/password.service';
import { IResponse } from 'src/app/models/iresponse';
import { PasswordStrengthValidator } from 'src/app/constants/password-strength.validators';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit {

  private token: string;
  public loading = false;
  public passwordForm: FormGroup;

  constructor(private router: Router,
              private notificationService: NotificationService,
              private validateService: ValidateService,
              private route: ActivatedRoute,
              private passwordService: PasswordService) { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8), PasswordStrengthValidator]),
      confirmPassword: new FormControl('', [Validators.required, this.validateService.passwordConfirm])
    });

    this.route.queryParams.subscribe(
      (params: Params) => {
        this.token = params.token;
      }
    );
  }

  onSubmit(form: FormGroup): void {
    this.loading = true;
    this.passwordService.resetPassword(this.token, form.value.password).subscribe(
      (response: IResponse) => {
        this.loading = false;
        if (response.responseCode === '000') {
          this.notificationService.showNotificationLite('success', response.responseMessage);
          this.router.navigate(['/auth']);
        } else {
          this.notificationService.showNotificationLite('danger', response.responseMessage);
        }
      }
    );
  }

  onNewRequest(): void {
    this.router.navigate(['/auth', 'password', 'new']);
  }

}
