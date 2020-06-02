import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PasswordService } from 'src/app/services/password/password.service';
import { IResponse } from 'src/app/models/iresponse';

@Component({
  selector: 'app-change-pwd-request',
  templateUrl: './change-pwd-request.component.html',
  styleUrls: ['./change-pwd-request.component.scss']
})
export class ChangePwdRequestComponent implements OnInit {

  public emailForm: FormGroup;
  public loading = false;

  constructor(private router: Router,
              private notificationService: NotificationService,
              private passwordService: PasswordService) { }

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit(form: FormGroup): void {
    this.loading = true;
    this.passwordService.resetPasswordRequest(form.value.email).subscribe(
      (response: IResponse) => {
        this.loading = false;
        if (response.responseCode === '000') {
          this.notificationService.showNotificationLite('success', 'Email sent successfully');
          this.router.navigate(['/auth']);
        } else {
          this.notificationService.showNotificationLite('danger', response.responseMessage);
        }
      }
    );
  }
}
