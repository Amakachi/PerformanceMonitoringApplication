// import { Injectable } from '@angular/core';
// import { RestclientService } from '../restclient/restclient.service';
// import { getGraphFrStatsTab, getTranResponseMsgCount } from 'src/app/constants/constants';
// import { IDashResponse } from 'src/app/models/idashResponse';
// import { IDashRequest } from 'src/app/models/idashrequest';
// import { ResponseMessageCount } from 'src/app/models/response-message-count';
// import { tap } from 'rxjs/operators';
// import { Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class StatsService {

//   constructor(private restClient: RestclientService) { }

//   getResponseMessageCount(partner: string,transactionChannel: string, startDate: string, endDate: string): Observable<ResponseMessageCount[]> {
//     let data: IDashRequest = { partner,transactionChannel, startDate, endDate };

//     return this.restClient.funcPost(data, getTranResponseMsgCount.apiUrl).pipe(
//       tap((response: ResponseMessageCount[]) => {
//         console.log(response);
//       })
//     );
//   }

//   getGraphDetails(transactionChannel: string, startDate: string, endDate: string, destinationAffiliate: string): Observable<IDashResponse[]> {
//     let data: IDashRequest = { transactionChannel, startDate, endDate, destinationAffiliate };
//     console.log(data);

//     return this.restClient.funcPost(data, getGraphFrStatsTab.apiUrl).pipe(
//       tap((response: IDashResponse[]) => {
//         console.log(response);
//       })
//     );
//   }


// }










import { Injectable } from '@angular/core';
import { RestclientService } from '../restclient/restclient.service';
import {getGraphFrStatsTab, getGraphFrStatsTabCustom, getTranResponseMsgCount} from 'src/app/constants/constants';
import { IDashResponse } from 'src/app/models/idashResponse';
import { IDashRequest } from 'src/app/models/idashrequest';
import { ResponseMessageCount } from 'src/app/models/response-message-count';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private restClient: RestclientService) { }
  getResponseMessageCount(destinationAffiliate: string, sourceAffiliate: string, transactionChannel: string, startDate: string, endDate: string): Observable<ResponseMessageCount[]> {
    let data: IDashRequest = { destinationAffiliate, sourceAffiliate, transactionChannel, startDate, endDate };

    return this.restClient.funcPost(data, getTranResponseMsgCount.apiUrl).pipe(
      tap((response: ResponseMessageCount[]) => {
        console.log(response);
      })
    );
  }

  getGraphDetails(destinationAffiliate: string, sourceAffiliate: string, transactionChannel: string, startDate: string, endDate: string,  ): Observable<IDashResponse[]> {
    let data: IDashRequest = {destinationAffiliate, sourceAffiliate, transactionChannel, startDate, endDate };
    console.log(data);

    return this.restClient.funcPost(data, getGraphFrStatsTab.apiUrl).pipe(
      tap((response: IDashResponse[]) => {
        console.log(response);
      })
    );
  }

  // tslint:disable-next-line:max-line-length
  getGraphCustomDetails(startDate: string, endDate: string, transactionChannel: string,  destinationAffiliate: string, sourceAffiliate: string): Observable<IDashResponse[]> {
    let data: IDashRequest = { startDate, endDate, transactionChannel,  destinationAffiliate, sourceAffiliate };
    console.log(data);

    return this.restClient.funcPost(data, getGraphFrStatsTabCustom.apiUrl).pipe(
      tap((response: IDashResponse[]) => {
        console.log(response);
      })
    );
  }
}
