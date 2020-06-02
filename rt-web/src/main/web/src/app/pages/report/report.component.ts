import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ReportService } from 'src/app/services/report/report.service';
import { PartnerService } from 'src/app/services/partner/partner.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { formatDate } from '@angular/common';
import {  transactionPartners_, transactionCategoriesReports } from 'src/app/constants/states';
import { MailService } from 'src/app/services/mail/mail.service';
import {IEmailBody} from '../../models/iemailbody';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import {Router} from '@angular/router';

interface TransactionTable {
  transactionPartner: string;
  transactionCount: any;
  totalValue: any;
  successCount: any;
  pendingCount: any;
  failedCount: any;
  totalAmount?: any;
  successAmount: any;
  pendingAmount: any;
  failedAmount: any;

}
// tslint:disable-next-line:class-name
interface ResponseMessageTable {
  responseCode: string;
  responseMessage: string;
  errorCount: number;
  percentage: number;
}
interface TransactionTableByStatus {
  status: string;
  totalValue: any;
  totalVolume: any;
  volumePercentage: any;
  valuePercentage: any;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @ViewChild('pdf') pdf: ElementRef;
  @ViewChild('excel') excel: ElementRef;
  fileName = 'RT-Report.xlsx';
  displayReport: boolean = false;
  topTab: boolean = false;

  activeTab: number;

  TRANSACTION_DATA: TransactionTable[];
  displayedColumns: string[];
  dataSourceOne: TransactionTable[];

  TRANSACTION_DATA_BY_STATUS: TransactionTableByStatus[];
  displayedColumnsByStatus: string[];
  dataSourceByStatus: TransactionTableByStatus[] = [];

  RESPONSE_DATA: ResponseMessageTable[];
  displayedColumnsError: string[];
  dataSourceTwo: ResponseMessageTable[];

  maxDate = new Date();
  showSpinner: boolean = false;
  overlay: boolean = false;
  mailSummaryBtn: boolean = false;
  

  private formattedStartDate: string;
  private formattedEndDate: string;
  private sourceAff: string;
  private partner: string;
  private sendOrReceive: string;
  // public dashboardTabs: IDash[];
  public transTable: any = [{ title: 'Succcessful Transactions', count: 0 },
  { title: 'Pending Transactions', count: 0 },
  { title: 'Failed Transactions', count: 0 }];

public mailBody: IEmailBody;
  public userCompany 

  public transactionCategories: { name: string, value: string }[] = transactionCategoriesReports;
  public transactionPartners: { name: string, value: string }[] =  transactionPartners_;

  transactionCategoryControl = new FormControl('SEND');
  transactionPartnerControl = new FormControl('ALIP');
  dailyDate = new FormControl(this.maxDate, Validators.required);
  customStartDate = new FormControl(this.maxDate, Validators.required);
  customEndDate = new FormControl(this.maxDate, Validators.required);
  email = new FormControl('', Validators.required);
  disableSelect = new FormControl(true);



  convertDBNameToUI(DBName): string {
   return this.partnerService.convertDBValuePartnerNameToUIPartnerName(DBName)
  }


  constructor(
    private reportService: ReportService,
    private partnerService: PartnerService,
    private mailService: MailService,
    private notificationService: NotificationService,
    private excelService: ExcelService,
    private router: Router
  ) {
  }

  async searchReport() {

    let startDate: string;
    let endDate: string;

    if (this.activeTab === 0) {
      startDate = this.dailyDate.value;
      endDate = this.dailyDate.value;
    } else if (this.activeTab === 1) {
      startDate = this.customStartDate.value;
      endDate = this.customEndDate.value;
    } else {


      alert('You shouldn\'t get here, waz going oh hia!');
      return;
    }


    try {
      this.overlay = true;
      this.showSpinner = true;
      const locale = 'en-US';

      this.formattedStartDate = formatDate(startDate, 'dd-MMM-yyyy', locale);
      this.formattedEndDate = formatDate(endDate, 'dd-MMM-yyyy', locale);
      const transactionChannel = "";

      if (this.userCompany == 'ECOBANK') {
        this.sourceAff = this.transactionCategoryControl.value.toLowerCase() === 'send' ? "" :  this.transactionPartnerControl.value.toUpperCase();
        this.partner = this.transactionCategoryControl.value.toLowerCase() == 'send' ? this.transactionPartnerControl.value.toUpperCase() : "";
        this.sendOrReceive = this.transactionCategoryControl.value.toUpperCase();
      } else {
        console.log(this.transactionCategoryControl.value);
        this.sourceAff = this.transactionCategoryControl.value.toLowerCase() === 'receive' ? "" : this.partnerService.getCurrentPartnerValue();
        this.partner = this.transactionCategoryControl.value.toLowerCase() === 'receive' ? this.partnerService.getCurrentPartnerValue() : "";
        this.sendOrReceive = this.transactionCategoryControl.value.toLowerCase() === 'receive' ? 'SEND' : 'RECEIVE';
      }
      console.log(this.partner+"this is the partner")

      console.log(transactionChannel, this.formattedStartDate, this.formattedEndDate, this.partner, this.sourceAff);

      await this.getSummaryReportByTransPartner(transactionChannel, this.formattedStartDate, this.formattedEndDate, this.partner, this.sourceAff, this.sendOrReceive)
      await this.getSummaryReportByTransStatus(transactionChannel, this.formattedStartDate, this.formattedEndDate, this.partner, this.sourceAff, this.sendOrReceive)
      await this.getReportResponseMessage(transactionChannel, this.formattedStartDate, this.formattedEndDate, this.partner, this.sourceAff, this.sendOrReceive)

      this.displayReport = true;
      this.showSpinner = false;
      this.overlay = false;


    } catch (error) {
      this.displayReport = false;
      this.showSpinner = false;
      this.overlay = false;
      console.log(error)
      this.notificationService.showNotificationLite('danger', 'Error fetching, please try again')

    }


  }

  ngOnInit() {
    this.userCompany = this.partnerService.getCompanyOfLoggedInUser();
    console.log(this.userCompany)
    this.activeTab = 0;
  }

  trackCurrentTab(event: MatTabChangeEvent): number {
    if (event.index === 1) {
      this.dailyDate.reset(this.maxDate);
    } else {
      this.customStartDate.reset(this.maxDate);
      this.customEndDate.reset(this.maxDate);
    }

    return this.activeTab = event.index;
  }

  downloadAsPDF() {
    try {
      let html = htmlToPdfmake(this.pdf.nativeElement.innerHTML, {
        defaultStyles: { // change the default styles
          th: {
            fillColor: '#006891',
            color: 'white',
            padding: 20
          },
        }
      });

      let docDefinition = {
        content: [
          html
        ],
        // a string or { width: number, height: number }
        pageSize: 'A4',
        pageOrientation: 'landscape',
        styles: {
          'html-td': {
            padding: 20
          },
          'html-table': {
            // marginBottom: 50,
            width: '100%'
          }
        }
      };

      let pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.open();

    } catch (error) {
      console.log(error)
      this.notificationService.showNotificationLite('danger', 'Error while downloading PDF');
    }
  }

  sendToEmail() {

    this.mailSummaryBtn = true

    let data: IEmailBody = {receiver: this.email.value,
      htmlTemplate: this.pdf.nativeElement.innerHTML}
      const emailBody = this.mailService.sendEmail(data).subscribe((response) => {
        console.log(response)
        if(response.responseCode == "000"){
          this.notificationService.showNotificationLite('success', 'Mail sent successfully');
        }else {
          this.notificationService.showNotificationLite('danger', 'Mail failed to send');
        }
      });

    this.mailSummaryBtn = false


  }

  downloadAsExcel() {
    try {

      let element = this.excel.nativeElement;

      this.excelService.exportAsExcelFileForHTML(element, "RT-Settlement_", "Report")


    } catch (error) {
      console.log(error)
      this.notificationService.showNotificationLite('danger', 'Error creating works');
    }
  }

  searchNavigation(status: string){
    status = status === 'total' ? '' : status;
    this.partnerService.setSearchForSearchTransParameters("", status.toUpperCase(), this.formattedStartDate, this.formattedEndDate, this.sendOrReceive);
    this.partnerService.setSearchFromLiveSummaryForSearchTrans(true);
    if(this.userCompany == "ECOBANK") {
      let partnerRoute = this.transactionPartnerControl.value.toUpperCase() ;
      this.router.navigateByUrl(`/app/partners/${partnerRoute}/search`)
    }else {
      this.router.navigateByUrl(`/app/home/search`)
    }

  }
  // Services

  getSummaryReportByTransStatus(transactionChannel: string, startDate: string, endDate: string, destinationAffiliate: string, sourceAff: string, sendOrReceive:string): void {

    this.reportService.getSummaryReportByTransStatus(transactionChannel, destinationAffiliate, sourceAff, startDate, endDate, sendOrReceive)
      .subscribe((response: any) => {

          console.log(response)

          if (response.length === 0 || response[0].transactionCount === null) {
            this.displayedColumnsByStatus = ['status', 'totalVolume', 'totalValue', 'volumePercentage', 'valuePercentage'];
            return;
          }

          const res = [
            { status: 'successful', totalVolume: response[0].successCount, volumePercentage: response[0].percentageSuccess, totalValue: response[0].successAmount, valuePercentage:  response[0].percSuccessAmount},
            { status: 'pending', totalVolume: response[0].pendingCount, volumePercentage: response[0].percentagePending, totalValue:  response[0].pendingAmount, valuePercentage: response[0].percPendingAmount },
            { status: 'failed', totalVolume: response[0].failedCount, volumePercentage: response[0].percentageFailed, totalValue:  response[0].failedAmount, valuePercentage: response[0].percFailedAmount},
            { status: 'total', totalVolume: response[0].transactionCount, volumePercentage: response[0].totalPercentageAmount, totalValue:  response[0].transactionAmount, valuePercentage: response[0].totalPercentageCount},
          ];
          console.log(res);
          this.TRANSACTION_DATA_BY_STATUS = res;          
          this.displayedColumnsByStatus = ['status', 'totalVolume', 'totalValue', 'volumePercentage', 'valuePercentage'];
          this.dataSourceByStatus = this.TRANSACTION_DATA_BY_STATUS;
        },
        (error) => {
          console.log(error);
        });
  }
  getSummaryReportByTransPartner(transactionChannel: string, startDate: string, endDate: string, destinationAffiliate: string, sourceAff: string, sendOrReceive:string): void {
    this.reportService.getSummaryReportByTransPartner(destinationAffiliate, sourceAff, transactionChannel, startDate, endDate, sendOrReceive)
      .subscribe((ELEMENT_DATA: any[]) => {
        this.TRANSACTION_DATA = ELEMENT_DATA;

        this.displayedColumns = ['transactionPartner', 'totalValue', 'successAmount',  'pendingAmount', 'failedAmount', 'transactionCount', 'successCount', 'pendingCount', 'failedCount'];
        this.dataSourceOne = this.TRANSACTION_DATA;

      },
        (error) => {
          console.log(error);
        });
  }


  getReportResponseMessage(transactionChannel: string, startDate: string, endDate: string, destinationAffiliate: string, sourceAff: string, sendOrReceive: string): void {
    console.log(transactionChannel, startDate, endDate, destinationAffiliate);

    this.reportService.getReportResponseMessage(transactionChannel, destinationAffiliate, sourceAff, startDate, endDate, sendOrReceive)
      .subscribe((response: any[]) => {
        console.log(response)
        this.RESPONSE_DATA = response;

        this.displayedColumnsError = ['responseCode', 'responseMessage', 'errorCount', 'percentage'];
        this.dataSourceTwo = this.RESPONSE_DATA;
      },
        (error) => {
          console.log(error);
          throw error.message;
        });
  }

}
