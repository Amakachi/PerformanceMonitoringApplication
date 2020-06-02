import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { RestclientService } from 'src/app/services/restclient/restclient.service';
import { rejectPending } from 'src/app/constants/constants';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rejectdialog',
  templateUrl: './rejectdialog.component.html',
  styleUrls: ['./rejectdialog.component.scss']
})
export class RejectdialogComponent implements OnInit {

  private userId: string = null;
  private firstName: string = null;
  firstFormGroup: FormGroup;

  constructor(private restClient: RestclientService,private notificationService: NotificationService, public dialogRef: MatDialogRef<RejectdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.firstFormGroup = new FormGroup({
      'remark': new FormControl(null, [Validators.required])
    })
  }


  rejectUser(){
    const link = rejectPending.apiUrl.replace("{id}", this.data.userId);
  
    this.restClient.funcPost(this.firstFormGroup.value, link).subscribe((response) => {

      if(response.responseCode == "000"){
        this.notificationService.showNotificationLite('success', 'User was rejected successfully');
      }else if(response.responseCode == "999"){
        this.notificationService.showNotificationLite('danger', 'User rejection failed');
      }
      
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
