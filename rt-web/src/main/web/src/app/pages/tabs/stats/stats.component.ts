import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ValueProvider } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ResponseMessageCount } from 'src/app/models/response-message-count';
import { IDashResponse } from 'src/app/models/idashResponse';
import { StatsService } from 'src/app/services/statstab/stats.service';
import { Label, Color } from 'ng2-charts';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { formatDate } from '@angular/common';
import { PartnerService } from 'src/app/services/partner/partner.service';
import {NotificationService} from '../../../services/notification/notification.service';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { productTypes, transactionChannels } from 'src/app/constants/states';



@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {



  constructor(
    private statsService: StatsService,
    private partnerService: PartnerService,
    private notificationService: NotificationService
  ) { }
  dataSource: any;
  activeTab = 0;
  displaySearchChartResult = false;
  displaySearchErrorResult = false;
  nodata = '';
  overlay = false;
  showSpinner = false;
  public userCompany: string;
  private transPartner: string;
  private sourceAffiliate: string;
  private destinationAffiliate: string;
  public selectedGraphOption = 'Volume';
  public formattedStartDate: string;
  public formattedEndDate: string;
  public startDate: string;
  public endDate: string;
  public statChartLoading: boolean = false;
   updatedSuccessVolume = [];
   updatedPendingVolume = [];
   updatedFailedVolume = [];
  updatedSuccessValue = [];
   updatedPendingValue = [];
  updatedFailedValue = [];

  public statChartType: string = 'line';
  public lineChartPlugins = [pluginAnnotations];

  public productTypes = productTypes

  displayedColumns: any;
  statForm: FormGroup;
  transactionChannels = transactionChannels;

  public statChart: any;
  public statChartLegend = true;
  public statChartData: ChartDataSets[] = [
    { data: [1, 2, 3, 4, 5, 6], label: 'Success' },
    { data: [1, 2, 3, 4, 5, 6], label: 'Pending' },
    { data: [1, 2, 3, 4, 5, 6], label: 'Failed' }
  ];
  public failedTransaction: any[];
  public pendingTransaction: any[];
  public statChartLabels: Label[] = ['loading', 'loading', 'loading', 'loading', 'loading', 'loading', 'loading'];
  public statChartOptions: (ChartOptions & { annotation: any }) = {
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
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'black',
            fontFamily: 'Roboto',
            beginAtZero: true,
            // tslint:disable-next-line:only-arrow-functions
            callback(value) { if (Number.isInteger(value)) { return value; } },
          },
        }
      ]
    },
  annotation: {
    annotations: [
      {
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value: 'March',
        borderColor: 'orange',
        borderWidth: 2,
        label: {
          enabled: true,
          fontColor: 'orange',
          content: 'LineAnno'
        }
      },
    ],
  },
};

  public statChartColors: Color[] = [
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

  updateLineChartOption(yLabelString, date) {
    this.statChartOptions = {
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
            labelString: 'Date of transaction: ' + date
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
              labelString: yLabelString
            },
            gridLines: {
              color: 'rgba(255,0,0,0.3)',
            },
            ticks: {
              fontColor: 'black',
              fontFamily: 'Roboto',
              beginAtZero: true,
              // tslint:disable-next-line:only-arrow-functions
              callback(value) { if (Number.isInteger(value)) { return value; } },
            },
          }
        ]
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              enabled: true,
              fontColor: 'orange',
              content: 'LineAnno'
            }
          },
        ],
      },
    };
  }
  handleLineGraphTime(event) {
    console.log(event);
    if (event === 'volume') {
      this.statChartLoading = true;
      // tslint:disable-next-line:max-line-length
      const dateOnLegendFooter = this.startDate == this.endDate ? this.formattedStartDate : `${this.formattedStartDate} - ${this.formattedEndDate}`;
      this.updateLineChartOption('Volume of transaction', dateOnLegendFooter);
      this.statChartData = [
        {data: this.updatedSuccessVolume, label: 'Success'},
        {data: this.updatedPendingVolume, label: 'Pending'},
        {data: this.updatedFailedVolume, label: 'Failed'}
      ];
      this.statChartLoading = false;

    } else if (event === 'value') {
      this.statChartLoading = true;
      // tslint:disable-next-line:triple-equals
      const dateOnLegendFooter = this.startDate == this.endDate ? this.formattedStartDate : `${this.formattedStartDate} - ${this.formattedEndDate}`;
      this.updateLineChartOption('Value of transaction(USD)', dateOnLegendFooter);

      this.statChartData = [
        {data: this.updatedSuccessValue, label: 'Success'},
        {data: this.updatedPendingValue, label: 'Pending'},
        {data: this.updatedFailedValue, label: 'Failed'}
      ];
      this.statChartLoading = false;
    }
  }


    searchStat() {

    this.displaySearchChartResult = false;
    this.displaySearchErrorResult = false;


    console.log(this.statForm);
    const statInput = this.statForm.value;
    const locale = 'en-US';





    if (this.activeTab === 0 && statInput.dailyDate !== '') {
      this.startDate = statInput.dailyDate;
      this.endDate = statInput.dailyDate;
    } else if (this.activeTab === 1 && statInput.startDate !== '' && statInput.endDate !== '') {
      this.startDate = statInput.startDate;
      this.endDate = statInput.endDate;
    } else {
      alert('Please input something ');
      return;
    }

    this.overlay = true;
    this.showSpinner = true;

    this.formattedStartDate = formatDate(this.startDate, 'dd-MMM-yyyy', locale);
    this.formattedEndDate = formatDate(this.endDate, 'dd-MMM-yyyy', locale);


    if (statInput.transactionView === 'send' ) {
      this.sourceAffiliate = '';
      this.destinationAffiliate = this.transPartner;
      // tslint:disable-next-line:max-line-length

      // tslint:disable-next-line:max-line-length
      this.getResponseMessageCount(this.destinationAffiliate, this.sourceAffiliate, statInput.transactionChannel, this.formattedStartDate, this.formattedEndDate);
      this.getGraphDetails(this.destinationAffiliate, this.sourceAffiliate, statInput.transactionChannel, this.formattedStartDate, this.formattedEndDate);
      // this.handleLineGraphTime();

    }
    if (statInput.transactionView === 'receive') {
      this.sourceAffiliate = this.transPartner;
      this.destinationAffiliate = '';
      // tslint:disable-next-line:max-line-length
      this.getResponseMessageCount(this.destinationAffiliate, this.sourceAffiliate, statInput.transactionChannel, this.formattedStartDate, this.formattedEndDate);
      // tslint:disable-next-line:max-line-length
      this.getGraphDetails(this.destinationAffiliate, this.sourceAffiliate, statInput.transactionChannel, this.formattedStartDate, this.formattedEndDate);
      // tslint:disable-next-line:max-line-length
      // this.handleLineGraphTime(this.volVal);
      // tslint:disable-next-line:max-line-length

    }

  }


  trackCurrentTab(event: MatTabChangeEvent) {
    this.activeTab = event.index;
  }

  ngOnInit() {
    this.userCompany = this.partnerService.getCompanyOfLoggedInUser();
    this.transPartner =  this.partnerService.getCurrentPartnerValue();

    this.activeTab = 0;

    this.statForm = new FormGroup({
      transactionChannel: new FormControl(''),
      transactionView: new FormControl('send'),
      dailyDate: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });

    this.initiateTable();
  }




  initiateTable() {
    const ELEMENT_DATA: any[] = [
      { responseCode: 1, responseMessage: 'Success', errorCount: 10, responsePercentage: '4%'}
    ];



    this.displayedColumns = ['responseCode', 'responseMessage', 'errorCount', 'responsePercentage'];
    this.dataSource = ELEMENT_DATA;
  }



  // tslint:disable-next-line:max-line-length
 getGraphDetails(destinationAffiliate: string, sourceAffiliate: string, transactionChannel: string, startDate: string, endDate: string): void {
   this.updatedSuccessVolume = [];
   this.updatedPendingVolume = [];
   this.updatedFailedVolume = [];
   this.updatedSuccessValue = [];
   this.updatedPendingValue = [];
   this.updatedFailedValue = [];
   this.statsService.getGraphDetails(destinationAffiliate, sourceAffiliate, transactionChannel, startDate, endDate)
      .subscribe(

        (response: IDashResponse[]) => {
          console.log(response);
          this.overlay = false;
          this.showSpinner = false;
          if (response.length < 1) {
            this.nodata = 'No data available';
            this.displaySearchChartResult = false;
            return;
          }
          this.displaySearchChartResult = true;

          const chartLabel = [];

          response.map(item => {
            this.updatedSuccessVolume.push(item.successCount);
            this.updatedPendingVolume.push(item.pendingCount);
            this.updatedFailedVolume.push(item.failedCount);
            this.updatedSuccessValue.push(item.successAmount_);
            this.updatedPendingValue.push(item.pendingAmount_);
            this.updatedFailedValue.push(item.failedAmount_);
            chartLabel.push(item.daily);
          });

          this.statChartData = [
            { data: this.updatedSuccessVolume, label: 'Success' },
            { data: this.updatedPendingVolume, label: 'Pending' },
            { data: this.updatedFailedVolume, label: 'Failed' }
          ];
          const dateOnLegendFooter = this.startDate == this.endDate ? this.formattedStartDate : `${this.formattedStartDate} - ${this.formattedEndDate}`;
          this.updateLineChartOption('Volume of transaction', dateOnLegendFooter);
          this.statChartLabels = chartLabel;
          this.statChartLoading = false;


// end of the chart call


        },
        (error) => {
          console.log(error);
        }
      );
  }


  // tslint:disable-next-line:max-line-length
  getResponseMessageCount(destinationAffiliate: string, sourceAffiliate: string, transactionChannel: string, startDate: string, endDate: string): void {
    this.displayedColumns = ['responseCode', 'responseMessage', 'errorCount', 'responsePercentage'];
    this.dataSource = [];

    this.statsService.getResponseMessageCount(destinationAffiliate, sourceAffiliate, transactionChannel, startDate, endDate)
      .subscribe((ELEMENT_DATA: ResponseMessageCount[]) => {
          this.overlay = false;
          this.showSpinner = false;
          if (ELEMENT_DATA.length < 1) {

          this.displaySearchChartResult = false;
          return;
        }
          this.dataSource = ELEMENT_DATA;
          this.displaySearchErrorResult = true;

      },
        (error) => {
          this.overlay = false;
          this.showSpinner = false;

          console.log(error);
          this.notificationService.showNotificationLite('info', 'Something went wrong');
        });
  }


}
