import { Injectable } from '@angular/core';
import { RestclientService } from '../restclient/restclient.service';
import {
  getSearchTransactions,
  getSearchTransactionDetail,
  getSenderKycDetails,
  getReceiverKycDetails,
  getSearchReportDetails
} from 'src/app/constants/constants';
import { SearchTransactionRequest } from 'src/app/models/search-transaction-request';
import { SearchTransactionResponse } from 'src/app/models/search-transaction-response';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { SearchByIdResponse } from 'src/app/models/searchById-response';
import { SenderKycDetails } from 'src/app/models/senderKycDetails';
import { ReceiverKycDetails } from 'src/app/models/receiverKycDetails';

@Injectable({
  providedIn: 'root'
})
export class SearchtransactionService {

  constructor(private restClient: RestclientService) { }

  searchTransaction(partner: string, startDate: string, endDate: string,
                    recordLimit: number, referenceNo?: string, senderId?: string,
                    transactionChannel?: string, status?: string, sendOrReceive?: string): Observable<SearchTransactionResponse[]> {

    const data: SearchTransactionRequest = {
      partner,
      startDate,
      endDate,
      recordLimit,
      referenceNo,
      senderId,
      transactionChannel,
      status,
      sendOrReceive,
    };
    console.log(data);
    return this.restClient.funcPost(data, getSearchTransactions.apiUrl).pipe(
      tap((response: SearchTransactionResponse[]) => { console.log(response); })
    );
  }

  searchTransactionForExcelExport(partner: string, startDate: string,
                                  endDate: string, recordLimit: number,
                                  referenceNo?: string, senderId?: string,
                                  transactionChannel?: string, status?: string,
                                  sendOrReceive?: string): Observable<SearchTransactionResponse[]> {

    const data: SearchTransactionRequest = {
      partner,
      startDate,
      endDate,
      recordLimit,
      referenceNo,
      senderId,
      transactionChannel,
      status,
      sendOrReceive,
    };
    console.log(data);
    return this.restClient.funcPost(data, getSearchReportDetails.apiUrl).pipe(
      tap((response: SearchTransactionResponse[]) => { console.log(response); })
    );
  }


  getDetailsByTransID(transId: string, partner: string, sendOrReceive: string): Observable<SearchByIdResponse> {
    const data: { transId: string, partner: string, sendOrReceive: string } = { transId, partner, sendOrReceive };
    console.log(data);
    return this.restClient.funcPost(data, getSearchTransactionDetail.apiUrl).pipe(
      tap((response: SearchByIdResponse[]) => { console.log(response); }),
      map((response: SearchByIdResponse[]) => response[0])
    );
  }


  getSenderKycDetails(senderId: string): Observable<SenderKycDetails[]> {
    const data: { senderId: string } = { senderId };
    return this.restClient.funcPost(data, getSenderKycDetails.apiUrl).pipe(
      tap((res: SenderKycDetails[]) => { console.log(res); }),

    );
  }


  getReceiverKycDetails(receiverId: string): Observable<ReceiverKycDetails[]> {
    const data: { receiverId: string } = { receiverId };
    return this.restClient.funcPost(data, getReceiverKycDetails.apiUrl).pipe(
      tap((res: ReceiverKycDetails[]) => { console.log(res); }),

    );
  }

}
