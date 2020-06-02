import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { appproveUser, findById } from 'src/app/constants/constants';
import { RestclientService } from 'src/app/services/restclient/restclient.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit, AfterViewInit {

  private userId: string = null;
  private firstName: string = null;
  public remark: string = null;
  public disableField: boolean = false;
  public doneAction: boolean;

  constructor(private restClient: RestclientService,private notificationService: NotificationService, public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
}
  

ngAfterViewInit() {
this.findUser();
this.disableField = true;
}
  approveUser() : void{
    // console.log(this.data.userId);

    const link = appproveUser.apiUrl.replace("{id}", this.data.userId);
  
    this.restClient.funcGet(link).subscribe((response) => {

      if(response.responseCode == "000"){
        this.notificationService.showNotificationLite('success', 'User was approved successfully');
      }else if(response.responseCode == "999"){
        this.notificationService.showNotificationLite('danger', 'User approval failed');
      }
      
    })
   
  }


  findUser() : any {
    const link = findById.apiUrl.replace("{id}", this.data.userId);
  
    this.restClient.funcGet(link).subscribe((response) => {
        console.log(response);
       this.remark = response.remark
      
    })
   
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
