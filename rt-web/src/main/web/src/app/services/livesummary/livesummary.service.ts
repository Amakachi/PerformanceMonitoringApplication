import { Injectable } from '@angular/core';
import { RestclientService } from '../restclient/restclient.service';
import { getNosTransFrchannels } from 'src/app/constants/constants';
import { IDashResponse } from 'src/app/models/idashResponse';
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { SocketclientService } from '../socketClient/socketclient.service';
import { IDashRequest } from 'src/app/models/idashrequest';

@Injectable({
  providedIn: 'root'
})
export class LivesummaryService {

  public topic: string = '/topic/liveupdate';

  constructor(private restClient: RestclientService,private socketClient: SocketclientService) { }

  // This is for http calls
  getNosTransFrchannels(destinationAffiliate: string, sourceAffiliate: string,startDate: string,endDate: string): Observable<IDashResponse[]> {
    let data: IDashRequest = { destinationAffiliate,sourceAffiliate,startDate,endDate };
    console.log("data from live summary request", data)
    return this.restClient.funcPost(data,getNosTransFrchannels.apiUrl)
      .pipe(
        tap((response: IDashResponse[]) => { console.log(response) })
      );
  }

  // This is for web socket connection
  updateChart(partner: string): Observable<IDashResponse[]> {
    return this.socketClient.onMessage(this.topic+'/'+partner);
  }


}
