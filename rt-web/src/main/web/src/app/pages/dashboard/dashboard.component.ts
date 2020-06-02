import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { dateHelper } from 'src/app/constants/helper';
import { IDashResponse } from 'src/app/models/idashResponse';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { PartnerService } from 'src/app/services/partner/partner.service';
import { UserService } from 'src/app/services/user/user.service';
import { SocketclientService } from 'src/app/services/socketClient/socketclient.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDash } from 'src/app/models/idash';
import { dashboardTabs, month_names } from 'src/app/constants/states';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

  public isEcoBankUser: boolean;
  public transPartner: string;
  public dashboardTabs: IDash[] = dashboardTabs;
  public lineChartLoading = false;
  public displayChart = true;
  nodata = '';
  startDate: string = "01-NOV-2019" // dateHelper('yearly', 'start');
  endDate: string = "31-JAN-2020" // dateHelper('yearly', 'end');
  showSpinner = false;
  overlay = false;
  dateDDMMYY: string = 'MM';
  volumeValueData: string = 'volume';


  private unsubscribeSubject: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  updatedVolumeSuccessData = [];
  updatedVolumePendingData = [];
  updatedVolumeFailedData = [];
  updatedValueSuccessData = [];
  updatedValuePendingData = [];
  updatedValueFailedData = [];

  successVolCount: number;
  successValAmount: string;

  failedVolCount: number;
  failedValAmount: string;

  pendingVolCount: number;
  pendingValAmount: string;

  successPercVolCount: number;
  successPercValAmount: number;

  failedPercVolCount: number;
  failedPercValAmount: number;

  pendingPercVolCount: number;
  pendingPercValAmount: number;

  chartTextTitle = '';
  sendOrReceive: string;


  public lineChartType = 'line';
  public lineChartData: ChartDataSets[] = [
    { data: [1, 2, 3, 4, 5, 6], label: 'Success' },
    { data: [1, 2, 3, 4, 5, 6], label: 'Pending' },
    { data: [1, 2, 3, 4, 5, 6], label: 'Failed' }
  ];
  public successfulTransaction: IDash[];
  public failedTransaction: IDash[];
  public pendingTransaction: IDash[];
  public lineChartLabels: Label[] = ['loading', 'loading', 'loading', 'loading', 'loading', 'loading', 'loading'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0
      }
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 10,
        fontColor: 'black'
      }
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date of transaction'
        },
        ticks: {
          fontColor: 'black',
          fontFamily: 'Roboto',
          beginAtZero: true,
        },
      }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Volume of transaction'
          },
          ticks: {
            fontColor: 'black',
            fontFamily: 'Roboto',
            beginAtZero: true,
            callback: function (value) { if (Number.isInteger(value)) { return value; } },
          },
        }
      ]
    },
  };

  public lineChartColors: Color[] = [
    { // green
      backgroundColor: 'transparent',
      borderColor: '#1cff1f',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
    { // yellow
      backgroundColor: 'transparent',
      borderColor: '#fcff27',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fcff27',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'transparent',
      borderColor: '#ff2100',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#ff2100',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];


  constructor(private partnerService: PartnerService,
    private dashboardService: DashboardService,
    private socketClient: SocketclientService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    // For the display - to know if its an ecobank user or a partner
    // tslint:disable-next-line:triple-equals
    this.isEcoBankUser = this.partnerService.getCompanyOfLoggedInUser() == 'ECOBANK';
    this.transPartner = this.isEcoBankUser ? "" : this.partnerService.getCurrentPartnerValue();
    this.sendOrReceive = this.isEcoBankUser ? "SEND" : "RECEIVE"
    // Initiate web socket connection
    // this.socketClient.initiateSocket();

    console.log('NIBBS', 'ALIP', this.startDate, this.endDate, this.transPartner) // we will need to pass incoming/outgoing/all also



    //  To update the failed and pending per partner table
    this.getFailedPendingTransPartners('NIBBS', 'ALIP', this.startDate, this.endDate, this.sendOrReceive);
    // if (this.isEcoBankUser) {
    //   this.dashboardService.updateFailedPendingTrans(this.transPartner).pipe(takeUntil(this.unsubscribeSubject))
    //     .subscribe(
    //       (response: IDashResponse[]) => { console.log(response) }
    //     );
    // }


    // To update and display the top view
    this.getTotalPercDashStats(this.startDate, this.endDate, this.sendOrReceive, this.transPartner);
    // this.dashboardService.updateTotalDashStats(this.transPartner).pipe(takeUntil(this.unsubscribeSubject))
    //   .subscribe(
    //     (res: IDashResponse[]) => {
    //       let response = res[0];
    //       console.log(response);
    //       this.dashboardTabs = [
    //         { type: 'successful', title: 'Successful Transactions', count: response.successCount, percent: response.percentageSuccess, image: 'assets/img/successchart.svg' },
    //         { type: 'pending', title: 'Pending Transactions', count: response.pendingCount, percent: response.percentagePending, image: '/assets/img/pendingchart.svg' },
    //         { type: 'failed', title: 'Failed Transactions', count: response.failedCount, percent: response.failedCount, image: '/assets/img/failedchart.svg' },
    //       ];
    //     }
    //   )


    // make call to db to display the line chart
    this.getGraphStats(this.transPartner, this.startDate, this.endDate, this.sendOrReceive, this.dateDDMMYY);

  }
  updateLineChartOption(yLabelString, date, chartTitle) {
    this.chartTextTitle = chartTitle;
    this.lineChartOptions = {
      responsive: true,
      plugins: {
        datalabels: {
          display: false,
        },
      },
      elements: {
        line: {
          tension: 0
        }
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 10,
          fontColor: 'black'
        }
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: yLabelString
          },
          ticks: {
            fontColor: 'black',
            fontFamily: 'Roboto',
            beginAtZero: true,
          },
        }],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: date
            },
            ticks: {
              fontColor: 'black',
              fontFamily: 'Roboto',
              beginAtZero: true,
              callback: function (value) { if (Number.isInteger(value)) { return value; } },
            },
          }
        ]
      },
    };
  }

  async dashboardTopBarSearchLink(item) {

    if (this.isEcoBankUser) {
      return;
    } else {
      this.partnerService.setSearchForSearchTransParameters("", item.type.toUpperCase(), this.startDate, this.endDate, this.sendOrReceive);
      this.partnerService.setSearchFromLiveSummaryForSearchTrans(true);
      this.router.navigateByUrl(`/app/home/search`)
    }
  }

  dashboardSidePartnerBarSearchLink(item, status) {

    this.partnerService.setSearchForSearchTransParameters("", status.toUpperCase(), this.startDate, this.endDate, this.sendOrReceive);
    this.partnerService.setSearchFromLiveSummaryForSearchTrans(true);
    this.router.navigateByUrl(`/app/partners/${item.partner}/search`)
  }

  toggleDashTransactionCategory(event) {

    if (this.isEcoBankUser) {
      this.sendOrReceive = event.checked ? 'RECEIVE' : 'SEND'
    } else {
      this.sendOrReceive = event.checked ? 'SEND' : 'RECEIVE'
    }
    console.log(event)
    console.log(this.sendOrReceive)

    this.showSpinner = true;
    this.overlay = true;
    this.getGraphStats(this.transPartner, this.startDate, this.endDate, this.sendOrReceive, this.dateDDMMYY);
    this.getTotalPercDashStats(this.startDate, this.endDate, this.sendOrReceive, this.transPartner);
    this.getFailedPendingTransPartners('NIBBS', 'ALIP', this.startDate, this.endDate, this.sendOrReceive);



    // makes call to the database to retrieve for either the incoming or outgoing
    this.showSpinner = false;
    this.overlay = false;
  }




  handleVolVal(event) {
    console.log(event)
    if (event.value === 'volume') {
      this.volumeValueData = 'volume'
      this.dashboardTabs = [
        { type: 'successful', title: 'Successful Transactions', count: this.successVolCount, percent: this.successPercVolCount, image: 'assets/img/successchart.svg' },
        { type: 'pending', title: 'Pending Transactions', count: this.pendingVolCount, percent: this.pendingPercVolCount, image: '/assets/img/pendingchart.svg' },
        { type: 'failed', title: 'Failed Transactions', count: this.failedVolCount, percent: this.failedPercVolCount, image: '/assets/img/failedchart.svg' },
      ];

      if (this.dateDDMMYY == 'DD') {
        this.updateLineChartOption('Hours in Day of Transaction ( ' + this.startDate + ' )', 'Volume of transaction', "Total Transaction Volume in " + this.startDate);
      } else if (this.dateDDMMYY == 'MM') {
        this.updateLineChartOption('Days in Month of Transaction ( ' + month_names[new Date().getMonth()] + ' )', 'Volume of transaction', "Total Transaction Volume in " + month_names[new Date().getMonth()]);
      } else if (this.dateDDMMYY == 'YY') {
        this.updateLineChartOption('Months in Year of Transaction ( ' + new Date().getFullYear() + ' )', 'Volume of transaction', "Total Transaction Volume in " + new Date().getFullYear())
      }

      this.lineChartData = [
        { data: this.updatedVolumeSuccessData, label: 'Success' },
        { data: this.updatedVolumePendingData, label: 'Pending' },
        { data: this.updatedVolumeFailedData, label: 'Failed' }
      ];

    } else if (event.value === 'value') {
      this.volumeValueData = 'value'
      this.dashboardTabs = [
        { type: 'successful', title: 'Successful Transactions', count: this.successValAmount, percent: this.successPercValAmount, image: 'assets/img/successchart.svg' },
        { type: 'pending', title: 'Pending Transactions', count: this.pendingValAmount, percent: this.pendingPercValAmount, image: '/assets/img/pendingchart.svg' },
        { type: 'failed', title: 'Failed Transactions', count: this.failedValAmount, percent: this.failedPercValAmount, image: '/assets/img/failedchart.svg' },
      ];

      this.lineChartData = [
        { data: this.updatedValueSuccessData, label: 'Success' },
        { data: this.updatedValuePendingData, label: 'Pending' },
        { data: this.updatedValueFailedData, label: 'Failed' }
      ];

      if (this.dateDDMMYY == 'DD') {
        this.updateLineChartOption('Hours in Day of Transaction ( ' + this.startDate + ' )', 'Value of transaction(USD)', "Total Transaction Value in " + this.startDate);
      } else if (this.dateDDMMYY == 'MM') {
        this.updateLineChartOption('Days in Month of Transaction ( ' + month_names[new Date().getMonth()] + ' )', 'Value of transaction(USD)', "Total Transaction Volume in " + month_names[new Date().getMonth()]);
      } else if (this.dateDDMMYY == 'YY') {
        this.updateLineChartOption('Months in Year of Transaction ( ' + new Date().getFullYear() + ' )', 'Value of transaction(USD)', "Total Transaction Value in " + new Date().getFullYear());
      }

    }



  }

  handleLineGraphTime(e): void {
    const selectionValue = e.value;

    // this.volumeValueData = 'volume';

    if (selectionValue === 'daily') {
      this.startDate = "19-JAN-2020"  //dateHelper('daily', 'start');
      this.endDate = "19-JAN-2020" // dateHelper('daily', 'end');
      this.dateDDMMYY = 'DD'

      //Goteh Made a change here ( changed startDate to 01-NOV-2019)
    } else if (selectionValue === 'monthly') {
      this.startDate = "01-NOV-2019"  //dateHelper('monthly', 'start');
      this.endDate = "31-JAN-2020" //dateHelper('monthly', 'end');
      this.dateDDMMYY = 'MM'
    } else if (selectionValue === 'yearly') {
      this.startDate = dateHelper('yearly', 'start');
      console.log(this.startDate);

      this.endDate = dateHelper('yearly', 'end');
      console.log(this.endDate);
      this.dateDDMMYY = 'YY';
    }
    this.lineChartLoading = true;

    // make call and get lineChartLabel and lineChartData
    this.getGraphStats(this.transPartner, this.startDate, this.endDate, this.sendOrReceive, this.dateDDMMYY);
    this.getFailedPendingTransPartners('NIBBS', 'ALIP', this.startDate, this.endDate, this.sendOrReceive);
    this.getTotalPercDashStats(this.startDate, this.endDate, this.sendOrReceive, this.transPartner);

    this.lineChartLoading = false;
  }

  getFailedPendingTransPartners(data1: string, data2: string, startDate: string, endDate: string, sendOrReceive: string): void {



    this.dashboardService.getFailedPendingTransPartners(data1, data2, startDate, endDate, sendOrReceive).subscribe(
      (arr: any) => {
        // empty out array first.
        this.successfulTransaction = [];
        this.failedTransaction = [];
        this.pendingTransaction = [];
        arr.map(response => {
          response.map((item: IDashResponse) => {
            let formattedPartnerName = this.partnerService.convertDBValuePartnerNameToUIPartnerName(item.partner)
            this.successfulTransaction.push({ partner: formattedPartnerName, count: item.successCount, amount: item.successAmount })
            this.failedTransaction.push({ partner: formattedPartnerName, count: item.failedCount, amount: item.failedAmount })
            this.pendingTransaction.push({ partner: formattedPartnerName, count: item.pendingCount, amount: item.pendingAmount })
          })
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }




  getGraphStats(partner: string, startDate: string, endDate: string, sendOrReceive: string, ddOrMmOrYy: string) {
    this.updatedVolumeSuccessData = [];
    this.updatedVolumePendingData = [];
    this.updatedVolumeFailedData = [];
    this.updatedValueSuccessData = [];
    this.updatedValuePendingData = [];
    this.updatedValueFailedData = [];

    //this.volumeValueData = 'volume';

    this.dashboardService.getGraphStats(partner, startDate, endDate, sendOrReceive, ddOrMmOrYy).subscribe(
      (response: IDashResponse[]) => {
        if (response.length < 1) {
          this.nodata = 'No data available';
          this.displayChart = false;
          return;
        }

        this.displayChart = true;

        const chartLabel = [];
        if (this.dateDDMMYY == "YY") {
          for (let i = 0; i < 12; i++) {
            let month = response[i] ? `${response[i].transactionDate}`.slice(5) : -1;
            console.log(month)
            if (month !== -1) {
              this.updatedVolumeSuccessData.push(response[i].successCount);
              this.updatedVolumePendingData.push(response[i].pendingCount);
              this.updatedVolumeFailedData.push(response[i].failedCount);
              this.updatedValueSuccessData.push(response[i].successAmount_);
              this.updatedValuePendingData.push(response[i].pendingAmount_);
              this.updatedValueFailedData.push(response[i].failedAmount_);
            } else {
              this.updatedVolumeSuccessData.push(0);
              this.updatedVolumePendingData.push(0);
              this.updatedVolumeFailedData.push(0);
              this.updatedValueSuccessData.push(0);
              this.updatedValuePendingData.push(0);
              this.updatedValueFailedData.push(0);
            }
            console.log(this.updatedVolumeSuccessData)
            this.lineChartLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
          }
        } else {
          response.map(item => {
            this.updatedVolumeSuccessData.push(item.successCount);
            this.updatedVolumePendingData.push(item.pendingCount);
            this.updatedVolumeFailedData.push(item.failedCount);
            this.updatedValueSuccessData.push(item.successAmount_);
            this.updatedValuePendingData.push(item.pendingAmount_);
            this.updatedValueFailedData.push(item.failedAmount_);
            chartLabel.push(item.transactionDate);
          });
          this.lineChartLabels = chartLabel;
        }



        if (this.volumeValueData === 'volume') {
          this.lineChartData = [
            { data: this.updatedVolumeSuccessData, label: 'Success' },
            { data: this.updatedVolumePendingData, label: 'Pending' },
            { data: this.updatedVolumeFailedData, label: 'Failed' }
          ];

          if (this.dateDDMMYY == 'DD') {
            this.updateLineChartOption('Hours in Day of Transaction ( ' + this.startDate + ' )', "Volume of Transaction", "Total Transaction Volume in " + this.startDate);
          } else if (this.dateDDMMYY == 'MM') {
            this.updateLineChartOption('Days in Month of Transaction ( ' + month_names[new Date().getMonth()] + ' )', "Volume of Transaction", "Total Transaction Volume in " + month_names[new Date().getMonth()]);
          } else if (this.dateDDMMYY == 'YY') {
            this.updateLineChartOption('Months in Year of Transaction ( ' + new Date().getFullYear() + ' )', "Volume of Transaction", "Total Transaction Volume in " + new Date().getFullYear());
          }

        } else if (this.volumeValueData === 'value') {
          this.lineChartData = [
            { data: this.updatedValueSuccessData, label: 'Success' },
            { data: this.updatedValuePendingData, label: 'Pending' },
            { data: this.updatedValueFailedData, label: 'Failed' }
          ];

          if (this.dateDDMMYY == 'DD') {
            this.updateLineChartOption('Hours in Day of Transaction ( ' + this.startDate + ' )', "Value of Transaction (USD)", "Total Transaction Volume in " + this.startDate);
          } else if (this.dateDDMMYY == 'MM') {
            this.updateLineChartOption('Days in Month of Transaction ( ' + month_names[new Date().getMonth()] + ' )', "Value of Transaction (USD)", "Total Transaction Volume in " + month_names[new Date().getMonth()]);
          } else if (this.dateDDMMYY == 'YY') {
            this.updateLineChartOption('Months in Year of Transaction ( ' + new Date().getFullYear() + ' )', "Value of Transaction (USD)", "Total Transaction Volume in " + new Date().getFullYear());
          }

        }

        // end of the chart call
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTotalPercDashStats(startDate: string, endDate: string, sendOrReceive: string, partner: string) {
    this.dashboardService.getTotalPercDashStats(startDate, endDate, sendOrReceive, partner).subscribe(
      (response: IDashResponse) => {
        console.log(response);
        this.successVolCount = response.successCount;
        this.successValAmount = response.successAmount;

        this.failedVolCount = response.failedCount;
        this.failedValAmount = response.failedAmount;

        this.pendingVolCount = response.pendingCount;
        this.pendingValAmount = response.pendingAmount;

        this.successPercVolCount = response.percentageSuccess;
        this.successPercValAmount = response.percSuccessAmount;

        this.failedPercVolCount = response.percentageFailed;
        this.failedPercValAmount = response.percFailedAmount

        this.pendingPercVolCount = response.percentagePending;
        this.pendingPercValAmount = response.percPendingAmount;

        if (this.volumeValueData === 'volume') {
          this.dashboardTabs = [
            { type: 'successful', title: 'Successful Transactions', count: response.successCount, percent: response.percentageSuccess, image: 'assets/img/successchart.svg' },
            { type: 'pending', title: 'Pending Transactions', count: response.pendingCount, percent: response.percentagePending, image: '/assets/img/pendingchart.svg' },
            { type: 'failed', title: 'Failed Transactions', count: response.failedCount, percent: response.percentageFailed, image: '/assets/img/failedchart.svg' },
          ];

        } else if (this.volumeValueData === 'value') {
          this.dashboardTabs = [
            { type: 'successful', title: 'Successful Transactions', count: this.successValAmount, percent: this.successPercValAmount, image: 'assets/img/successchart.svg' },
            { type: 'pending', title: 'Pending Transactions', count: this.pendingValAmount, percent: this.pendingPercValAmount, image: '/assets/img/pendingchart.svg' },
            { type: 'failed', title: 'Failed Transactions', count: this.failedValAmount, percent: this.failedPercValAmount, image: '/assets/img/failedchart.svg' },
          ];
        }


      },
      (error) => {
        console.log(error);
      }
    );
  }

}
