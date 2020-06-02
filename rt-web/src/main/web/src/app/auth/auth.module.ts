import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { PasswordComponent } from './password/password.component';
import { ChangePwdComponent } from './password/change-pwd/change-pwd.component';
import { ChangePwdRequestComponent } from './password/change-pwd-request/change-pwd-request.component';


@NgModule({
  declarations: [LoginComponent, PasswordComponent, ChangePwdComponent, ChangePwdRequestComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule
  ]
})
export class AuthModule { }
