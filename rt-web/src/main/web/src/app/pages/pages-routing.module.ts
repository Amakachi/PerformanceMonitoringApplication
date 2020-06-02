import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PartnerComponent } from './partner/partner.component';
import { ReportComponent } from './report/report.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { PartnerdashboardComponent } from './partnerdashboard/partnerdashboard.component';
import { ViewusersComponent } from './usermanagement/viewusers/viewusers.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReportDetailComponent } from './reportdetail/reportdetail.component';
import { LivesummaryComponent } from './tabs/livesummary/livesummary.component';
import { StatsComponent } from './tabs/stats/stats.component';
import { SearchtransComponent } from './tabs/searchtrans/searchtrans.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'home',
      component: PartnerdashboardComponent,
      children: [
        { path: '', redirectTo: 'livesummary', pathMatch: 'full'},
        { path: 'livesummary', component: DashboardComponent},
        { path: 'stats', component: StatsComponent},
        { path: 'search', component: SearchtransComponent}
      ]
    },
    {
      path: 'partners/:name',
      component: PartnerComponent,
      children: [
        { path: '', redirectTo: 'livesummary', pathMatch: 'full'},
        { path: 'livesummary', component: LivesummaryComponent},
        { path: 'stats', component: StatsComponent},
        { path: 'search', component: SearchtransComponent}
      ]
    },
    {
      path: 'summary',
      component: ReportComponent,
    },
    {
      path: 'detail',
      component: ReportDetailComponent,
    },
    {
      path: 'resetpassword',
      component: ChangePasswordComponent,
    },
    {
      path: 'users',
      component: UsermanagementComponent,
    },
    {
      path: 'viewusers',
      component: ViewusersComponent,
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
