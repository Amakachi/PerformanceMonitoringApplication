import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PasswordService } from 'src/app/services/password/password.service';
import { IResponse } from 'src/app/models/iresponse';
import { PasswordStrengthValidator } from 'src/app/constants/password-strength.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public passwordForm: FormGroup;
  public loading = false;

  constructor(private router: Router,
              private notificationService: NotificationService,
              private validateService: ValidateService,
              private passwordService: PasswordService) { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), PasswordStrengthValidator]),
      confirmPassword: new FormControl('', [Validators.required, this.validateService.passwordConfirm])
    });
  }

  onSubmit(form: FormGroup): void {
    this.loading = true;
    this.passwordService.updatePassword(form.value.oldPassword, form.value.password).subscribe(
      (response: IResponse) => {
        this.loading = false;
        if (response.responseCode === '000') {
          this.notificationService.showNotificationLite('success', response.responseMessage);
          this.router.navigate(['/app']);
        } else {
          this.notificationService.showNotificationLite('danger', response.responseMessage);
        }
      }
    );
  }

}
