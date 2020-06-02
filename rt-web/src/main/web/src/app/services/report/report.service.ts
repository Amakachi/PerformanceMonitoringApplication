import { Injectable } from '@angular/core';
import { RestclientService } from '../restclient/restclient.service';
import { Observable } from 'rxjs';
import { ResponseMessageCount } from 'src/app/models/response-message-count';
import { IDashRequest } from 'src/app/models/idashrequest';
import { tap, map } from 'rxjs/operators';
import {
  getReportResponseMessage,
  getReportTotals,
  getReportTransactionTable,
  getReportChannelStats,
  getReportDetailTotals,
  getResponseErrorData, getTransChannelsReport
} from 'src/app/constants/constants';
import { IDashResponse } from 'src/app/models/idashResponse';
import { ReportDetails } from 'src/app/models/report-details';




@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private restClient: RestclientService) {
  }


  getSummaryReportByTransStatus(transactionChannel: string, destinationAffiliate: string, sourceAffiliate: string, startDate: string, endDate: string, sendOrReceive: string): Observable<IDashResponse> {
    let data: IDashRequest = {
      startDate,
      endDate,
      destinationAffiliate,
      sourceAffiliate,
      transactionChannel,
      sendOrReceive
    };
    return this.restClient.funcPost(data, getReportTotals.apiUrl).pipe(
      tap((response: IDashResponse) => {
        console.log(response);
      })
    );
  }

//  String destinationAffiliate, String sourceAffiliate, String transactionChannel, String startDate, String endDate)
  getReportResponseMessage(transactionChannel: string, destinationAffiliate: string, sourceAffiliate: string, startDate: string, endDate: string, sendOrReceive: string): Observable<ResponseMessageCount[]> {
    let data: IDashRequest = {
      destinationAffiliate,
      sourceAffiliate,
      transactionChannel,
      startDate,
      endDate,
      sendOrReceive,
    };
    return this.restClient.funcPost(data, getReportResponseMessage.apiUrl).pipe(
      tap((response: ResponseMessageCount[]) => {
        console.log(response)
      })
    );
  }

  getSummaryReportByTransPartner(destinationAffiliate: string, sourceAffiliate: string, transactionChannel: string, startDate: string, endDate: string, sendOrReceive: string,): Observable<ReportDetails[]> {
    let data: IDashRequest = {

      destinationAffiliate,
      sourceAffiliate,
      transactionChannel,
      startDate,
      endDate,
      sendOrReceive,
    };
    console.log(data)
    return this.restClient.funcPost(data, getReportTransactionTable.apiUrl).pipe(
      tap((response: ReportDetails[]) => {
        console.log(response)
      })
    );
  }

  getReportChannelStats(transactionChannel: string, destinationAffiliate: string, sourceAffiliate: string, startDate: string, endDate: string): Observable<IDashResponse> {
    let data: IDashRequest = {destinationAffiliate, sourceAffiliate, startDate, endDate, transactionChannel};
    return this.restClient.funcPost(data, getReportChannelStats.apiUrl).pipe(
      tap((response: IDashResponse) => {
        console.log(response);
      })
    );
  }
  getReportDetailTotals(startDate: string, endDate: string, sendOrReceive: string, transactionChannel: string, partner: string, affiliate: string): Observable<IDashResponse[]> {
    let data: IDashRequest = {startDate, endDate, sendOrReceive, transactionChannel, partner, affiliate};
    console.log(data)
    return this.restClient.funcPost(data, getReportDetailTotals.apiUrl).pipe(
      tap((response: IDashResponse[]) => {
        console.log(response);
      })
    );
  }
  getResponseErrorDataTable(partner: string, affiliate: string, transactionChannel: string, sendOrReceive: string,  startDate: string, endDate: string ): Observable<ResponseMessageCount[]> {
    let data: IDashRequest = {partner, affiliate, transactionChannel, sendOrReceive, startDate, endDate};
    console.log(data)
    return this.restClient.funcPost(data, getResponseErrorData.apiUrl). pipe(
      tap( (response: ResponseMessageCount[]) => {
        console.log(response);
      })
    );
  }
  getTransChannels(partner: string): Observable<any> {
    let data: IDashRequest = {partner};
    return this.restClient.funcPost(data,  getTransChannelsReport.apiUrl). pipe(
      tap( (response: any) => {
        console.log(response);
      })
    );
  }
  getReportTotals(transactionChannel: string, destinationAffiliate : string, sourceAffiliate: string,  startDate: string, endDate: string): Observable<IDashResponse> {
    let data: IDashRequest = { startDate, endDate,destinationAffiliate,sourceAffiliate,transactionChannel };
    console.log(data)
    return this.restClient.funcPost(data, getReportTotals.apiUrl).pipe(
      tap((response: IDashResponse) => {
        console.log(response);
      })
    );
  }
}
