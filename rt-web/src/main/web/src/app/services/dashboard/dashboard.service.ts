import { Injectable } from '@angular/core';
import { RestclientService } from '../restclient/restclient.service';
import { Observable, forkJoin } from 'rxjs';
import { IDashRequest } from 'src/app/models/idashrequest';
import { IDashResponse } from 'src/app/models/idashResponse';
import { getTotalPercDashStats, getGraphStatsDashboard, getFailedPendingTransPartners } from 'src/app/constants/constants';
import { tap, map } from 'rxjs/operators';
import { SocketclientService } from '../socketClient/socketclient.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private restClient: RestclientService,private socketClient: SocketclientService) { }

  topic1 = '/topic/dashboardupdate/trans';
  topic2 = '/topic/dashboardupdate/dashstats';

  getFailedPendingTransPartners(data1: string, data2: string,startDate:string,endDate:string,sendOrReceive: string): Observable<IDashResponse[]> {
    const rq1: IDashRequest = { partner: data1,startDate,endDate,sendOrReceive }
    const rq2: IDashRequest = { partner: data2,startDate,endDate,sendOrReceive }

    let response1 = this.restClient.funcPost(rq1, getFailedPendingTransPartners.apiUrl);
    let response2 = this.restClient.funcPost(rq2, getFailedPendingTransPartners.apiUrl);

    return forkJoin([response1, response2]).pipe(
      tap((responseList: IDashResponse[])=>{ console.log(responseList)})
    );
  }

  getTotalPercDashStats(startDate: string,endDate: string,sendOrReceive: string,partner: string): Observable<IDashResponse> {
    let data: IDashRequest = { startDate,endDate,sendOrReceive, partner };
    return this.restClient.funcPost(data,getTotalPercDashStats.apiUrl)
      .pipe(
        tap((response: IDashResponse[]) => { console.log(response) }),
        map((response: IDashResponse[]) => response[0] )
      )
  }

  getGraphStats(partner: string,startDate: string, endDate: string,sendOrReceive: string,ddOrMmOrYy: string): Observable<IDashResponse[]> {
    let data: IDashRequest = { partner,sendOrReceive,startDate, endDate,ddOrMmOrYy };
    console.log(data);
    return this.restClient.funcPost(data, getGraphStatsDashboard.apiUrl)
    .pipe(
      tap((response: IDashResponse[]) => { console.log(response) })
    )
  }

  updateFailedPendingTrans(partner: string): Observable<IDashResponse[]>{
    return this.socketClient.onMessage(this.topic1+'/'+partner);
  }

  updateTotalDashStats(partner: string): Observable<IDashResponse[]> {
    return this.socketClient.onMessage(this.topic2+'/'+partner);
  }

}
