import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { RestclientService } from './services/restclient/restclient.service';
import { ValidateService } from './services/validate/validate.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user/user.service';
import { PartnerService } from './services/partner/partner.service';
import { NotificationService } from './services/notification/notification.service';
import { AuthService } from './services/auth/auth.service';


@NgModule({
  declarations: [ AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    SharedModule,
    PagesModule,
  ],
  providers: [AuthService,RestclientService,ValidateService,UserService,PartnerService,NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
