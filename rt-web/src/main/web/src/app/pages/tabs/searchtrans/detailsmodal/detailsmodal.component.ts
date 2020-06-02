import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchtransactionService } from 'src/app/services/searchtrans/searchtransaction.service';
import { SearchByIdResponse } from 'src/app/models/searchById-response';

@Component({
  selector: 'app-detailsmodal',
  templateUrl: './detailsmodal.component.html',
  styleUrls: ['./detailsmodal.component.scss']
})
export class DetailsmodalComponent implements OnInit {

  modalLoaded: false;
  private transactionId: string = null;
  private partner: string = null;
  private sendOrReceive: string = null;

  public transDetails: SearchByIdResponse = {
    tranId: 0,
    externalRef: '',
    sourceAffiliate: '',
    sendAmount: '',
    sourceCurrency: '',
    receiveAmount: '',
    receiveDate: '',
    destinationCurrency: '',
    queueState: ''
  };


  constructor(
    public dialogRef: MatDialogRef<DetailsmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private searchTranService: SearchtransactionService
  ) { }


  ngOnInit(): void {
    this.transactionId = this.data.transactionId;
    this.partner = this.data.partner;
    this.sendOrReceive = this.data.sendOrReceive;
  
    this.searchTranService.getDetailsByTransID(this.transactionId, this.partner, this.sendOrReceive)
      .subscribe((response: SearchByIdResponse) => {
        console.log(response);
        this.transDetails = response;
        console.log(this.transDetails);
      });
  }

  close(): void {
    this.dialogRef.close();
  }

}
