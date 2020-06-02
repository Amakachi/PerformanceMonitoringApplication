import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { PartnerService } from 'src/app/services/partner/partner.service';
import { IDashResponse } from 'src/app/models/idashResponse';
import { LivesummaryService } from 'src/app/services/livesummary/livesummary.service';
import { SocketclientService } from 'src/app/services/socketClient/socketclient.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { dateHelper } from 'src/app/constants/helper';
import { Router } from '@angular/router';


interface ChartProperties {
  title: string;
  dbValue: string;
  transactionTypeSelected: string;
  data: MultiDataSet;
  volumeData: MultiDataSet;
  valueData: MultiDataSet;
  label: Label[];
  option: {};
  color: Color[];
  type: ChartType;
}


@Component({
  selector: 'app-livesummary',
  templateUrl: './livesummary.component.html',
  styleUrls: ['./livesummary.component.css']
})
export class LivesummaryComponent implements OnInit, OnDestroy {


  constructor(private partnerService: PartnerService,
              private liveSummaryService: LivesummaryService,
              private socketClient: SocketclientService,
              private router: Router
              ) { }

  private unsubscribeSubject: Subject<void> = new Subject<void>();
  private partner: string;

  // defaults
  transactionCategoryIsIncoming = false;
  volumeValueLoading = -1;
  isDoughnutShowing = true;
  status = '';
  statusIndex: number;
  showSpinner = false;
  overlay = false;
  currDate = '19-JAN-2020';  // dateHelper('daily', 'start');


  barChartPlugins = [pluginDataLabels];
  doughnutChartColors: Color[] = [{ backgroundColor: ['#1cff1f', '#f0e00b', '#ff4c00'] }];
  doughnutChartOptions: {} = {
    plugins: {
      datalabels: {
        display: false,
      },
    },
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          const label = data.labels;
          return label[tooltipItem.index] || '';
        }
      }
    },
    scales: {
      xAxes: [{

        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date of transaction: ' + this.currDate
        },
        ticks: {
          display: false,
        },
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          display: false,
        },
        gridLines: {
          display: false
        }

      }]
    },
    title: {
      display: false,
    },
    legend: {
      display: this.isDoughnutShowing,
      position: 'right',
      responsive: true,
      maintainAspectRatio: true,
      labels: {
        usePointStyle: true,
        fontColor: 'rgb(29,49,255)',
      },
      events: ['mousemove'], // this is needed, otherwise onHover is not fired
      onHover: (event, chartElement) => {
        event.target.style.cursor = chartElement ? 'pointer' : 'default';
      },
      onClick: (event, item) => {
        item.fillStyle === '#1cff1f' ? this.status = 'SUCCESSFUL' :
          item.fillStyle === '#f0e00b' ? this.status = 'PENDING' :
            item.fillStyle === '#ff4c00' ? this.status = 'FAILED' : this.status = '';
        this.navigateToSearchPage(this.statusIndex);

      }
    },


    responsive: true,
  };

  allDoughnutChart: ChartProperties[] = [];

  navigateToSearchPage(index) {
    let sendOrReceive = this.transactionCategoryIsIncoming ? "RECEIVE" : "SEND"
    this.partnerService.setSearchForSearchTransParameters(this.allDoughnutChart[index].dbValue, this.status, this.currDate, this.currDate, sendOrReceive);
    console.log(this.allDoughnutChart[index].dbValue, this.status, this.currDate, this.currDate, sendOrReceive);
    this.partnerService.setSearchFromLiveSummaryForSearchTrans(true);
    this.router.navigateByUrl(`/app/partners/${this.partner}/search`);
  }


  // events
  chartClicked({ event, active }, index: number): void {
    this.statusIndex = index;

    if (active.length) {
      const item = active[0]._options.backgroundColor;
      item === '#1cff1f' ? this.status = 'SUCCESSFUL' :
        item === '#f0e00b' ? this.status = 'PENDING' :
          item === '#ff4c00' ? this.status = 'FAILED' : this.status = '';
      this.navigateToSearchPage(index);
    }
  }


  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  ngOnInit(): void {
    this.partner = this.partnerService.getCurrentPartnerValue();
    this.setDoughnutChart();
  }

  handleVolumeValueSwitch(e, index) {
    const val = e.value;
    console.log(index, val);
    this.volumeValueLoading = index;
    this.allDoughnutChart[index].transactionTypeSelected = val;

    if (this.allDoughnutChart[index].transactionTypeSelected === 'volume') {
      this.allDoughnutChart[index].type = 'doughnut';
      this.allDoughnutChart[index].option = this.doughnutChartOptions;
      this.allDoughnutChart[index].data = this.allDoughnutChart[index].volumeData;

      this.allDoughnutChart[index].label = [
        this.allDoughnutChart[index].data[0][0].toLocaleString() + ' transactions',
        this.allDoughnutChart[index].data[0][1].toLocaleString() + ' transactions',
        this.allDoughnutChart[index].data[0][2].toLocaleString() + ' transactions',
      ];

    } else {
      this.allDoughnutChart[index].data = this.allDoughnutChart[index].valueData;
      this.allDoughnutChart[index].type = 'bar';
      this.allDoughnutChart[index].option = {
        scaleShowVerticalLines: true,
        responsive: true,
        scaleShowValues: true,
        scaleValuePaddingX: 10,
        scaleValuePaddingY: 10,
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              const label = data.labels;
              return label[tooltipItem.index] || '';
            }
          }
        },
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{

            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date of transaction: ' + this.currDate
            },
            ticks: {
              display: false,
            },
          }],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Value of transaction(USD)'
              },
              ticks: {
                fontColor: 'black',
                fontFamily: 'Roboto',
                beginAtZero: true,
                callback(value) { if (Number.isInteger(value)) { return value; } },
              },
            }
          ]
        },
        plugins: {
          datalabels: {
            display: true,
            anchor: 'end',
            align: 'center',
            formatter(value, context) { return context.chart.data.labels[context.dataIndex]; }
          }
        }
      };
        console.log(this.allDoughnutChart[index].data);
      this.allDoughnutChart[index].label = [
        '$' + this.allDoughnutChart[index].data[0][0].toLocaleString(),
        '$' + this.allDoughnutChart[index].data[0][1].toLocaleString(),
        '$' + this.allDoughnutChart[index].data[0][2].toLocaleString(),
      ];
    }

    this.volumeValueLoading = -1;

  }

  setDoughnutChart() {
    const category = this.transactionCategoryIsIncoming ? 'receive' : 'send';
    const sourceAffiliate = category === 'send' ? '' : this.partner;
    const destinationAffiliate = category === 'send' ? this.partner : '';

    console.log(category, destinationAffiliate, sourceAffiliate);
    console.log(this.partnerService.getCurrentPartnerValue());
    console.log(this.partner);
    this.liveSummaryService.getNosTransFrchannels(destinationAffiliate, sourceAffiliate, this.currDate, this.currDate)
      .pipe(takeUntil(this.unsubscribeSubject)).subscribe(
        (response: IDashResponse[]) => {
          this.allDoughnutChart = [];
          if (response.length) {
            for (let i = 0; i < response.length; i++) {
              this.allDoughnutChart.push({
                title: response[i].channels,
                dbValue: response[i].channelCode,
                transactionTypeSelected: 'volume',
                data: [[1, 1, 1]],
                volumeData: [[response[i].successCount, response[i].pendingCount, response[i].failedCount]],
                valueData: [[+response[i].successAmount, +response[i].pendingAmount, +response[i].failedAmount]],
                label: ['loading...', 'loading...', 'loading...'],
                option: this.doughnutChartOptions,
                color: this.doughnutChartColors,
                type: 'doughnut',
              });
            }
          }
          for (let i = 0; i < this.allDoughnutChart.length; i++) {
            if (this.allDoughnutChart[i].transactionTypeSelected === 'volume') {
              this.allDoughnutChart[i].data = this.allDoughnutChart[i].volumeData;

              this.allDoughnutChart[i].label = [
                this.allDoughnutChart[i].data[0][0].toLocaleString() + ' transactions',
                this.allDoughnutChart[i].data[0][1].toLocaleString() + ' transactions',
                this.allDoughnutChart[i].data[0][2].toLocaleString() + ' transactions',
              ];

            } else {
              this.allDoughnutChart[i].data = this.allDoughnutChart[i].valueData;
              this.allDoughnutChart[i].label = [
                '$' + this.allDoughnutChart[i].data[0][0].toLocaleString(),
                '$' + this.allDoughnutChart[i].data[0][1].toLocaleString(),
                '$' + this.allDoughnutChart[i].data[0][2].toLocaleString(),
              ];
              this.allDoughnutChart[i].option = {
                title: {
                  display: false,
                },
                legend: {
                  display: false,
                },
                scales: {
                  xAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Date of transaction ' + this.currDate
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
                        labelString: 'Value of transaction(USD)'
                      },
                      ticks: {
                        fontColor: 'black',
                        fontFamily: 'Roboto',
                        beginAtZero: true,
                        callback(value) { if (Number.isInteger(value)) { return value; } },
                      },
                    }
                  ]
                },
                plugins: {
                  datalabels: {
                    display: false,
                  }
                },
                responsive: true,
              };
            }
          }

        },
        (error) => {
          console.log(error);
        }
      );




  }

  toggleTransactionCategory() {
    this.transactionCategoryIsIncoming = !this.transactionCategoryIsIncoming;
    this.showSpinner = true;
    this.overlay = true;

    this.setDoughnutChart();

    this.showSpinner = false;
    this.overlay = false;
  }


}
