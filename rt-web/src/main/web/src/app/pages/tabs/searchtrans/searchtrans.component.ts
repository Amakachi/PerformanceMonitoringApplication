import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SearchTransactionResponse } from 'src/app/models/search-transaction-response';
import { SearchtransactionService } from 'src/app/services/searchtrans/searchtransaction.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailsmodalComponent } from './detailsmodal/detailsmodal.component';
import { PartnerService } from 'src/app/services/partner/partner.service';
import { ReceiverKycModalComponent } from './receiverkyc/receiver-kyc-modal/receiver-kyc-modal.component';
import { SenderKycModalComponent } from './senderkyc/sender-kyc-modal/sender-kyc-modal.component';
import { transactionChannels, transactionCategories } from 'src/app/constants/states';
import { ExcelService } from 'src/app/services/excel/excel.service';



@Component({
  selector: 'app-searchtrans',
  templateUrl: './searchtrans.component.html',
  styleUrls: ['./searchtrans.component.css']
})
export class SearchtransComponent implements OnInit, AfterViewInit {

  public dataSource: any;
  private transPartner: string ;
  tableDataLoaded = false;
  emptyTableReturned = false;
  showSpinner = false;
  overlay = false;
  nodata = '';
  userCompany = this.partnerService.getCompanyOfLoggedInUser();
  isExcelExportingInProgress = false;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public displayedColumns: string[] = ['Serial', 'Transaction Id', 'Sender Id', 'Receiver Id',
    'Reference No', 'Transaction Date', 'Transaction Channel', 'Receive Channel', 'Amount',
    'Source Affiliate', 'Destination Affiliate', 'Transaction Status', 'Response Message', 'Action'];
  public activeTab: number;
  public recordLimits: { item: number, value: number }[] = [
    { item: 10, value: 10 },
    { item: 20, value: 20 },
    { item: 50, value: 50 },
    { item: 100, value: 100 },
    { item: 1000, value: 1000 }
  ];

  public transactionStatus_: { name: string, value: string }[] = [
    { name: 'ALL', value: '' },
    { name: 'Successful', value: 'SUCCESSFUL' },
    { name: 'Failed', value: 'FAILED' },
    { name: 'Pending', value: 'PENDING' },
  ];

  public transactionChannels: { name: string, value: string }[] = transactionChannels;
  public transactionTypes: { name: string, value: string }[] = transactionCategories;

  public searchForm: FormGroup;
  public maxDate = new Date();

  // Final values for searching and excel document generation
  searchPartner: string;
  searchFormattedStartDate: string;
  searchFormattedEndDate: string;
  searchRefNo: string;
  searchSenderId: string;
  searchReceiverId: string;
  searchTransChannel: string;
  searchStatus: string;
  searchLimit: number;
  searchSendOrReceive: string;

  constructor(
    private searchTransService: SearchtransactionService,
    private partnerService: PartnerService,
    private excelService: ExcelService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }



  state = false;
  async ngAfterViewInit() {
    const item = this.partnerService.getSearchFromLiveSummaryForSearchTrans();

    if (item === true) {
      this.overlay = true;
      this.showSpinner = true;
      this.cdRef.detectChanges();

      this.searchPartner = this.transPartner;
      this.searchStatus = this.partnerService.getSearchFromLiveSummaryForSearchTransParameters().status;
      this.searchTransChannel = this.partnerService.getSearchFromLiveSummaryForSearchTransParameters().channel;
      this.searchFormattedStartDate = this.partnerService.getSearchFromLiveSummaryForSearchTransParameters().startDate;
      this.searchFormattedEndDate = this.partnerService.getSearchFromLiveSummaryForSearchTransParameters().endDate;
      this.searchLimit = 1000;
      this.searchSendOrReceive = this.partnerService.getSearchFromLiveSummaryForSearchTransParameters().sendOrReceive;

      this.searchTransaction(this.searchPartner, this.searchFormattedStartDate, this.searchFormattedEndDate,
        this.searchLimit, '', '', this.searchTransChannel, this.searchStatus, this.searchSendOrReceive);

    }
    this.partnerService.setSearchFromLiveSummaryForSearchTrans(false);

  }

  ngOnInit() {
    this.transPartner = this.partnerService.getCurrentPartnerValue();
    this.activeTab = 0;
    this.searchForm = new FormGroup({
      transactionChannel: new FormControl(''),
      sendOrReceive: new FormControl(''),
      senderId: new FormControl(''),
      referenceNo: new FormControl(''),
      transactionStatus: new FormControl(''),
      recordLimit: new FormControl(20),
      daily: new FormControl(this.maxDate, Validators.required),
      startDate: new FormControl(this.maxDate, Validators.required),
      endDate: new FormControl(this.maxDate, Validators.required),
    });
  }

  // This ensures that on leaving any of the date tabs, the date value is reset to default
  trackCurrentTab(event: MatTabChangeEvent): number {
    if (event.index === 1) {
      this.searchForm.get('daily').reset(this.maxDate);
    } else {
      this.searchForm.get('startDate').reset(this.maxDate);
      this.searchForm.get('endDate').reset(this.maxDate);
    }

    return this.activeTab = event.index;
  }

  search(): void {
    this.tableDataLoaded = false;

    const searchInput = this.searchForm.value;
    const locale = 'en-US';
    let startDate: string;
    let endDate: string;

    if (this.activeTab === 0) {
      startDate = searchInput.daily;
      endDate = searchInput.daily;
    } else if (this.activeTab === 1) {
      startDate = searchInput.startDate;
      endDate = searchInput.endDate;
    } else {
      alert('You shouldn\'t get here, waz going oh hia!');
      return;
    }
    this.overlay = true;
    this.showSpinner = true;

    this.searchPartner = this.transPartner;
    this.searchFormattedStartDate = formatDate(startDate, 'dd-MMM-yyyy', locale);
    this.searchFormattedEndDate = formatDate(endDate, 'dd-MMM-yyyy', locale);
    this.searchRefNo = searchInput.referenceNo;
    this.searchSenderId = searchInput.senderId;
    this.searchTransChannel = searchInput.transactionChannel;
    this.searchStatus = searchInput.transactionStatus;
    this.searchLimit = searchInput.recordLimit;
    this.searchSendOrReceive = searchInput.sendOrReceive;

    this.searchTransaction(this.searchPartner, this.searchFormattedStartDate, this.searchFormattedEndDate, this.searchLimit, this.
      searchRefNo, this.searchSenderId, this.searchTransChannel, this.searchStatus, this.searchSendOrReceive);

  }


  exportAsExcel() {

    this.isExcelExportingInProgress = true;

    this.searchTransService.searchTransactionForExcelExport(this.searchPartner, this.searchFormattedStartDate,
      this.searchFormattedEndDate, this.searchLimit, this.searchRefNo, this.searchSenderId,
      this.searchTransChannel, this.searchStatus, this.searchSendOrReceive).subscribe(
        async (response: SearchTransactionResponse[]) => {
          const call = await this.excelService.exportAsExcelFileForArray(response, 'RT-Settlement_Report_', 'Detailed Transaction Result ', [['Serial', 'Transaction Id', 'Sender Id','Receiver Id', 
           'Transaction Date', 'Transaction Channel', 'Receive Channel', 'Amount',
          'Source Currency', 'Destination Currency', 'Source Affiliate', 'Destination Affiliate', 'Transaction Status', 'Response Message', 'Reference No', 'Receive Date', 'Send Amount', 'Receive Amount']]);
          console.log(call);
          this.isExcelExportingInProgress = false;

        },
        (error) => {
          console.log(error);
          this.isExcelExportingInProgress = false;
        });

  }



  searchTransaction(partner: string, startDate: string, endDate: string, recordLimit: number, referenceNo: string,
                    senderId: string, transactionChannel: string, status: string, sendOrReceive: string): void {

    this.searchTransService.searchTransaction(partner, startDate, endDate, recordLimit,
      referenceNo, senderId, transactionChannel, status, sendOrReceive).subscribe(
        (response: SearchTransactionResponse[]) => {
          this.overlay = false;
          this.showSpinner = false;
          if (response.length < 1) {
            this.nodata = 'No data available';
            this.tableDataLoaded = false;
            return;
          }
          this.dataSource = new MatTableDataSource<SearchTransactionResponse>(response);
          this.tableDataLoaded = true;
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.log(error);
        });
  }

  openDialog(transactionId: string): void {
    console.log('Transaction Id', transactionId)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '400px';
    dialogConfig.height = 'auto';
    // dialogConfig.minHeight = 'calc(100vh - 90px)'
    dialogConfig.data = { transactionId, partner: this.transPartner, sendOrReceive: this.searchSendOrReceive };
    const dialogRef = this.dialog.open(DetailsmodalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      console.log('The dialog was closed');
    });
  }

  getReceiverKyc(receiverId: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '400px';
    dialogConfig.height = 'auto';
    dialogConfig.data = { receiverId };
    const dialogRef = this.dialog.open(ReceiverKycModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      console.log('The dialog was closed');
    });
  }

  getSenderKyc(senderId: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '400px';
    dialogConfig.height = 'auto';
    dialogConfig.data = { senderId };
    const dialogRef = this.dialog.open(SenderKycModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      console.log('The dialog was closed');
    });
  }


}
