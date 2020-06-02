import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartjsModule } from 'ng-chartjs';
import { PartnerComponent } from './partner/partner.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { ReportComponent } from './report/report.component';
import { LivesummaryComponent } from './tabs/livesummary/livesummary.component';
import { StatsComponent } from './tabs/stats/stats.component';
import { SearchtransComponent } from './tabs/searchtrans/searchtrans.component';
import { ChartsModule } from 'ng2-charts';
import { MatSortModule } from '@angular/material/sort';
import { PartnerdashboardComponent } from './partnerdashboard/partnerdashboard.component';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { LivesummaryService } from '../services/livesummary/livesummary.service';
import { StatsService } from '../services/statstab/stats.service';
import { SearchtransactionService } from '../services/searchtrans/searchtransaction.service';
import { NewRoleDirective } from '../new-role.directive';
import { MatSpinnerOverlayComponent } from '../mat-spinner-overlay/mat-spinner-overlay.component';
import { DetailsmodalComponent } from './tabs/searchtrans/detailsmodal/detailsmodal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { SocketclientService } from '../services/socketClient/socketclient.service';
import { ReceiverKycModalComponent } from './tabs/searchtrans/receiverkyc/receiver-kyc-modal/receiver-kyc-modal.component';
import { SenderKycModalComponent } from './tabs/searchtrans/senderkyc/sender-kyc-modal/sender-kyc-modal.component';
import { ViewusersComponent } from './usermanagement/viewusers/viewusers.component';
import { DialogboxComponent } from './usermanagement/viewusers/dialogbox/dialogbox.component';
import { DetailsmodComponent } from './usermanagement/viewusers/detailsmod/detailsmod.component';
import { RejectdialogComponent } from './usermanagement/viewusers/rejectdialog/rejectdialog.component';
import { EditmodalComponent } from './usermanagement/viewusers/editmodal/editmodal.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReportDetailComponent } from './reportdetail/reportdetail.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PartnerComponent,
    UsermanagementComponent,
    ReportComponent,
    ReportDetailComponent,
    LivesummaryComponent,
    SearchtransComponent,
    StatsComponent,
    PartnerdashboardComponent,
    NewRoleDirective,
    MatSpinnerOverlayComponent,
    DetailsmodalComponent,
    ReceiverKycModalComponent,
    SenderKycModalComponent,
    ViewusersComponent,
    DialogboxComponent,
    DetailsmodComponent,
    RejectdialogComponent,
    EditmodalComponent,
    ChangePasswordComponent,
  ],
  imports: [
    NgChartjsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    ChartsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule

  ],

  providers: [
    MatDatepickerModule,
    DashboardService,
    LivesummaryService, 
    StatsService, 
    SearchtransactionService,
     SocketclientService
  ],
  entryComponents: [
    DetailsmodalComponent, 
    ReceiverKycModalComponent, 
    SenderKycModalComponent,
    DetailsmodComponent
  ]
})
export class PagesModule { }
