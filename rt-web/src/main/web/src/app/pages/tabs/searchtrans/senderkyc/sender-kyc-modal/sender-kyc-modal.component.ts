import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchtransactionService } from 'src/app/services/searchtrans/searchtransaction.service';
import { SenderKycDetails } from 'src/app/models/senderKycDetails';

@Component({
  selector: 'app-sender-kyc-modal',
  templateUrl: './sender-kyc-modal.component.html',
  styleUrls: ['./sender-kyc-modal.component.scss']
})
export class SenderKycModalComponent implements OnInit {

  public noData = '';
  public isData = false;
  private senderId = '';
  public senderKycDetails: SenderKycDetails = {
    senderId: '',
    firstName: '',
    lastName: '',
    gender: '',
    emailAddress: '',
    mobilePhone: '',
    affiliate: '',
    branchCode: '',
    customerType: '',
    contactAddress: '',
    dateOfBirth: '',
    nationality: '',
    country: '',
  };


  constructor(
    public dialogRef: MatDialogRef<SenderKycModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private searchTranService: SearchtransactionService
  ) { }

  ngOnInit(): void {
    this.senderId = this.data.senderId;
    this.searchTranService.getSenderKycDetails(this.senderId).subscribe(
      (resp: SenderKycDetails[]) => {
        if (resp.length < 1) {
          this.isData = false;
          this.noData = 'No data available';
          return;
        }
        this.isData = true;
        this.senderKycDetails = resp[0];
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }


}
