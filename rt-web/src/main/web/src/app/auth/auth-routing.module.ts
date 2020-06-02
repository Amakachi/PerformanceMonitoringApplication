import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { ChangePwdRequestComponent } from './password/change-pwd-request/change-pwd-request.component';
import { ChangePwdComponent } from './password/change-pwd/change-pwd.component';


const routes: Routes = [{
  path: '',
  component: LoginComponent,
},
{
  path: 'password',
  component: PasswordComponent,
  children: [
    { path: '', redirectTo: 'new', pathMatch: 'full' },
    { path: 'new', component: ChangePwdRequestComponent },
    { path: 'edit', component: ChangePwdComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
