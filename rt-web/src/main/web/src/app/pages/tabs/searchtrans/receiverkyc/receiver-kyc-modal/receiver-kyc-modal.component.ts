import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchtransactionService } from 'src/app/services/searchtrans/searchtransaction.service';
import { ReceiverKycDetails } from 'src/app/models/receiverKycDetails';

@Component({
  selector: 'app-receiver-kyc-modal',
  templateUrl: './receiver-kyc-modal.component.html',
  styleUrls: ['./receiver-kyc-modal.component.scss']
})
export class ReceiverKycModalComponent implements OnInit {

  public noData = '';
  public isData = false;
  private receiverId = '';
  public receiverKycDetails: ReceiverKycDetails = {
    receiverId: '',
    customerId: '',
    firstName: '',
    lastName: '',
    identificationType: '',
    identificationNumber: '',
    phoneNumber: '',
    emailAddress: '',
  };

  constructor(
    public dialogRef: MatDialogRef<ReceiverKycModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private searchTranService: SearchtransactionService
  ) { }

  ngOnInit(): void {
    this.receiverId = this.data.receiverId;
    this.searchTranService.getReceiverKycDetails(this.receiverId).subscribe(
      (resp: ReceiverKycDetails[]) => {
        if (resp.length < 1) {
          this.isData = false;
          this.noData = 'No data available';
          return;
        }
        console.log(resp);
        this.isData = true;
        this.receiverKycDetails = resp[0];
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

}
