import { Injectable } from '@angular/core';
import { RestclientService } from '../restclient/restclient.service';
import { IEmailBody } from 'src/app/models/iemailbody';
import { sendMail } from 'src/app/constants/constants';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private restClient: RestclientService) { }

  sendEmail(emailBody: IEmailBody): Observable<any> {
    return this.restClient.funcPost(emailBody, sendMail.apiUrl).pipe(
      tap((response: any) => {
        console.log(response);
      })
    );
  }

}
