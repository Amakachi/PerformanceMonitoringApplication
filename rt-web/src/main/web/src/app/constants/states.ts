import { IDash } from '../models/idash';

export const transactionChannels: {name: string, value: string}[] = [
    { name: 'ALL', value: '' },
    { name: 'African Rapid Transfer', value: 'ART' },
    { name: 'In Branch', value: 'BRN'},
];


export const transactionAffiliates: { affiliate: string }[] = [
  {
    affiliate: 'ALL'
  },
  {
    affiliate: 'EBF'
  },
  {
    affiliate: 'EBI'
  },
  {
    affiliate: 'EBJ'
  },
  {
    affiliate: 'ECD'
  },
  {
    affiliate: 'ECF'
  },
  {
    affiliate: 'ECG'
  },
  {
    affiliate: 'ECI'
  },
  {
    affiliate: 'ECM'
  },
  {
    affiliate: 'ECV'
  },
  {
    affiliate: 'EGA'
  },
  {
    affiliate: 'EGH'
  },
  {
    affiliate: 'EGM'
  },
  {
    affiliate: 'EGN'
  },
  {
    affiliate: 'EGQ'
  },
  {
    affiliate: 'EGW'
  },
  {
    affiliate: 'EKE'
  },
  {
    affiliate: 'ELR'
  },
  {
    affiliate: 'EML'
  },
  {
    affiliate: 'EMW'
  },
  {
    affiliate: 'EMZ'
  },
  {
    affiliate: 'ENE'
  },
  {
    affiliate: 'ENG'
  },
  {
    affiliate: 'ERW'
  },
  {
    affiliate: 'ESL'
  },
  {
    affiliate: 'ESN'
  },
  {
    affiliate: 'ESS'
  },
  {
    affiliate: 'EST'
  },
  {
    affiliate: 'ETD'
  },
  {
    affiliate: 'ETG'
  },
  {
    affiliate: 'ETZ'
  },
  {
    affiliate: 'EUG'
  },
  {
    affiliate: 'EZM'
  },
  {
    affiliate: 'EZW'
  }
];


export const transactionPartners: {name: string, value: string}[] = [
    { name: 'ALL', value: ''},
    { name: 'AliPay', value: 'ALIP' },
];

export const transactionPartners_: {name: string, value: string}[] = [
  { name: 'AliPay', value: 'ALIP' },
];
// export const transactionPartnersForReportSummary: {name: string, value: string}[] = [
//   { name: 'ALL', value: 'ALL' },
//   { name: 'AliPay', value: 'ALIP' },
// ];

export const dashboardTabs: IDash[] = [
    { type: 'successful', title: 'Successful Transactions', count: 0, percent: 0, image: 'assets/img/successchart.svg' },
    { type: 'pending', title: 'Pending Transactions', count: 0, percent: 0, image: '/assets/img/pendingchart.svg' },
    { type: 'failed', title: 'Failed Transactions', count: 0, percent: 0, image: '/assets/img/failedchart.svg' },
  ];

export const transactionCategories: {name: string, value: string}[] = [
    {name: 'ALL', value: ''},
    {name: 'Send', value: 'SEND'},
    {name: 'Receive', value: 'RECEIVE'}
  ];

  export const transactionCategoriesReports: {name: string, value: string}[] = [
    {name: 'Send', value: 'SEND'},
    {name: 'Receive', value: 'RECEIVE'}
  ];

  export const month_names =["January","Febuary","March",  "April","May","June", "July","August","September", "October","November","December"];
  export const productTypes =  [
    {name: 'Cash to wallet', value: 'cashtowallet'}
  ];