import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ReportService } from 'src/app/services/report/report.service';
import { IDashResponse } from 'src/app/models/idashResponse';
import { PartnerService } from 'src/app/services/partner/partner.service';

import { MatTabChangeEvent } from '@angular/material/tabs';
import { formatDate } from '@angular/common';
import { transactionPartners_, transactionCategoriesReports, transactionAffiliates } from 'src/app/constants/states';
import { IDash } from 'src/app/models/idash';
import {MailService} from '../../services/mail/mail.service';
import {IEmailBody} from '../../models/iemailbody';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ExcelService } from 'src/app/services/excel/excel.service';


// tslint:disable-next-line:class-name
interface ResponseMessageTable {
  responseCode: string;
  responseMessage: string;
  responsePercentage: number;
  responseCount: number;
  responseValue: string;
  transactionChannel: string;
}

interface TransactionTable {
  sourceAffiliate: string;
  destinationAffiliate: any;
  transactionAmount: string;
  successAmount: string;
  failedAmount: string;
  pendingAmount: string;
  totalVolume: any;
  successfulVolume: any;
  pendingVolume: any;
  failedVolume: any;
  successCount_: string;
  failedCount_: string;
  pendingCount_: string;
  transactionCount_: string;
  transactionChannel: string;
}

@Component({
  selector: 'app-reportdetail',
  templateUrl: './reportdetail.component.html',
  styleUrls: ['./reportdetail.component.css']
})
export class ReportDetailComponent implements OnInit {

  @ViewChild('pdf') pdf: ElementRef;
  @ViewChild('excel') excel: ElementRef;
  fileName = 'RT-Report.xlsx';
  displayReport = false;
  topTab = false;
  mailDetailBtn: boolean = false;

  activeTab: number;


  TRANSACTION_DATA: TransactionTable[];
  displayedColumns: string[];
  dataSourceOne: TransactionTable[];
  RESPONSE_DATA: ResponseMessageTable[][];
  dataSourceTwo: any;//ResponseMessageTable[][];
  allTransactionChannels: string[] = [];

  displayedColumnsResponse: string[];

  maxDate = new Date();
  showSpinner = false;
  overlay = false;

  private formattedStartDate: string;
  private formattedEndDate: string;
  private sourceAff: string;
  private partner: string;
  public mailBody: IEmailBody;



  public userCompany: string;

  public allAffiliate: { affiliate: string }[] = transactionAffiliates;
  public transactionPartners: { name: string, value: string }[] = transactionPartners_;
  public transactionCategories: { name: string, value: string }[] = transactionCategoriesReports;
  public transChannelHeading: string;

  transactionAffiliateControl = new FormControl('ALL');
  transactionPartnerControl = new FormControl('ALIP');
  transactionCategoryControl = new FormControl('SEND');
  dailyDate = new FormControl(this.maxDate, Validators.required);
  customStartDate = new FormControl(this.maxDate, Validators.required);
  customEndDate = new FormControl(this.maxDate, Validators.required);
  email = new FormControl('', Validators.required);
  disableSelect = new FormControl(true);


  convertDBNameOfTransactionStatusToUIName(DBName): string {
    if (DBName === 'ART') {
      return 'African Rapid Transfer';
    } else if (DBName === 'BRN') {
      return 'In Branch';
    } else {
      return DBName;
    }
  }



  constructor(
    private reportService: ReportService,
    private partnerService: PartnerService,
    private mailService: MailService,
    private notificationService: NotificationService,
    private excelService: ExcelService,
  ) {
  }

  searchReport() {

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
      const affiliate = this.transactionAffiliateControl.value === 'ALL' ? '' : this.transactionAffiliateControl.value;
      const partner = this.transactionPartnerControl.value

      if (this.userCompany == 'ECOBANK') {
        this.sourceAff = this.transactionCategoryControl.value === 'send' ? '' : this.transactionPartnerControl.value;
        this.partner = this.transactionCategoryControl.value === 'send' ? this.transactionPartnerControl.value : '';
      } else {
        this.sourceAff = this.transactionCategoryControl.value === 'send' ? this.userCompany : '';
        this.partner = this.transactionCategoryControl.value === 'send' ? '' : this.userCompany;
      }

// Transaction Detail Call
      this.getReportDetailTotals(this.formattedStartDate, this.formattedEndDate, this.transactionCategoryControl.value.toUpperCase(), partner, affiliate);


// Response Message Call
      this.getResponseErrorData(partner, affiliate, this.transactionCategoryControl.value.toUpperCase(), this.formattedStartDate, this.formattedEndDate);

      this.displayReport = true;
      this.showSpinner = false;
      this.overlay = false;

    } catch (error) {
      this.displayReport = false;
      this.showSpinner = false;
      this.overlay = false;
      console.log(error);
      this.notificationService.showNotificationLite('danger', 'Error fetching, please try again');


    }



  }

  ngOnInit() {
    this.userCompany =  this.partnerService.getCompanyOfLoggedInUser();

    this.activeTab = 0;
    // TODO
    // procedure should be modified to accommodate passing "all" not a partner's name
    this.getTransChannels("ALIP");
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
      const html = htmlToPdfmake(this.pdf.nativeElement.innerHTML, {
        defaultStyles: { // change the default styles
          th: {
            fillColor: '#006891',
            color: 'white',
            padding: 20
          },
        }
      });

      const docDefinition = {
        content: [
          html
        ],
        pageSize: 'A4',
        pageOrientation: 'landscape',
        styles: {
          'html-td': {
            padding: 20
          },
          'html-table': {
            marginTop: 10,
            marginBottom: 10,
            width: '100%'
          }
        }
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.open();

    } catch (error) {
      console.log(error);
      this.notificationService.showNotificationLite('danger', 'Error while downloading PDF');

    }
  }

  sendToEmail() {

    this.mailDetailBtn = true;

    const data: IEmailBody = {receiver: this.email.value,
      htmlTemplate: this.pdf.nativeElement.innerHTML};

      const emailBody = this.mailService.sendEmail(data).subscribe((response) => {
        if(response.responseCode == "000"){
          this.notificationService.showNotificationLite('success', 'Mail sent successfully');
        }else {
          this.notificationService.showNotificationLite('danger', 'Mail failed to send');
        }
      
      });
      this.mailDetailBtn = false;
    
  }

  downloadAsExcel() {
    try {
      const element = this.excel.nativeElement;

      this.excelService.exportAsExcelFileForHTML(element, "RT-Settlement_", "Detailed Report")
      
    } catch (error) {
      console.log(error);
      this.notificationService.showNotificationLite('danger', 'Error downloading Excel Sheet');

    }
  }


  // Services

  getTransChannels(partner: string): void {
    this.reportService.getTransChannels(partner)
      .subscribe( (response: any) => {
        this.allTransactionChannels =  [];
        response.map(item => this.allTransactionChannels.push(item.transactionChannel))
        console.log(this.allTransactionChannels);
      });
  }

  async getResponseErrorData(partner: string, affiliate: string, sendOrReceive: string, startDate: string, endDate: string) {
    if (this.allTransactionChannels.length === 0) {
      await this.getTransChannels('ALIP');
    }
         const allResponseMessages = []
    this.allTransactionChannels.forEach(channel => {
      this.reportService.getResponseErrorDataTable(partner, affiliate, channel, sendOrReceive, startDate, endDate)
        .subscribe((NEW_DATA: any) => {
            console.log(NEW_DATA);
            allResponseMessages.push(NEW_DATA)
          });
    })

         this.RESPONSE_DATA = allResponseMessages;
         this.displayedColumnsResponse = ['responseCode', 'responseMessage', 'responsePercentage', 'responseCount', 'responseValue'];
      this.dataSourceTwo = this.RESPONSE_DATA;

  }


  async getReportDetailTotals(startDate: string, endDate: string, sendOrReceive: string, partner: string, affiliate: string) {
    console.log("amaka");
    if (this.allTransactionChannels.length === 0) {
      await this.getTransChannels('ALIP');
    }
     const allTransDetails = []
    this.allTransactionChannels.forEach( async (channel) => {

      await this.reportService.getReportDetailTotals(startDate, endDate, sendOrReceive, channel, partner, affiliate)
          .subscribe((RESPONSE_DATA: any) => {
            console.log("result from service for details total", RESPONSE_DATA);
            allTransDetails.push(RESPONSE_DATA)
          });

      });

      this.TRANSACTION_DATA = allTransDetails;
    // tslint:disable-next-line:max-line-length
      this.displayedColumns = ['sourceAffiliate', 'destinationAffiliate', 'transactionAmount', 'successAmount', 'pendingAmount', 'failedAmount', 'transactionCount_', 'successCount_', 'pendingCount_', 'failedCount_'];
      this.dataSourceOne = this.TRANSACTION_DATA;

  }


}
