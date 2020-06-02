import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestclientService } from 'src/app/services/restclient/restclient.service';
import { data } from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { findById, updateUser } from 'src/app/constants/constants';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
 
@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.scss']
})
export class EditmodalComponent implements OnInit, AfterViewInit{


  
  ecoBankList = [
    { name: 'AliPay', value: 'ALIP' },
    // { name: 'NIBSS', value: 'NIBSS' },
    { name: 'ALL', value: 'ECO' }
  ]

  // nibssList = [
  //   { name: 'NIBSS', value: 'NIBSS' }
  // ]

  alipayList = [
    { name: 'AliPay', value: 'ALIP' }
  ]

  nonEcobankList = [
    { name: 'AliPay', value: 'ALIP' },
    // { name: 'NIBSS', value: 'NIBSS' }
  ]

  rolesList = [
    "Admin", "User"
  ]

  accessRightList = [
    "Reporting and Monitoring", "Monitoring"
  ]

 
  secondFormGroup: FormGroup;
  disable: boolean = null
  permission: any;
  per : any =[]
  count : number = 0
 
  constructor(private userService: UserService, private notificationService: NotificationService, private restClient: RestclientService, public dialogRef: MatDialogRef<EditmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
 
  ngOnInit(): void {

  
    console.log(this.data);
 
    this.secondFormGroup = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      // 'userName': new FormControl('', [Validators.required]),
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'approvalStatus': new FormControl('', [Validators.required]),
      'rejectStatus': new FormControl('', [Validators.required]),
      'role': new FormControl('', [Validators.required]),
      'accessiblePartners': new FormControl('', [Validators.required]),
      'accessRight': new FormControl([], [Validators.required]),
      
      // 'accessRights': new FormControl('')
    });
  
   
  }
 
  ngAfterViewInit(){
   
    this.getUserDetails();

    console.log(this.secondFormGroup);

    this.getPartnersList();
    
  }
 
  getPartnersList (){
    let userData = this.userService.getUserInfo()
    let roleName =  userData.roles[0].roleName
    const user = this.secondFormGroup.value;


    

    if(roleName == "ECO.Admin" && !user.email.includes('ecobank.com')){
      this.per.push(this.nonEcobankList)
    }
    // else if(roleName == "NIBSS.Admin"){
    //   this.per.push(this.nibssList)
    // }
    else if(roleName == "ALIP.Admin"){
      this.per.push(this.alipayList);
    }else if(roleName == "ECO.Admin"){
      this.per.push(this.ecoBankList);
      
    }

    this.permission = this.per[this.count];
    this.count++
  }

  getUserDetails(){
    this.disable= true;
    console.log("hhi i got here")
    const link = findById.apiUrl.replace("{id}", this.data.userId);
  
    this.restClient.funcGet(link).subscribe((response) => { 
  
      console.log(response);

      const role = response.roles[0].roleName.split('.');

      console.log(role);

      
  
        return this.secondFormGroup.setValue({
          email: response.email,
          // userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          approvalStatus: response.approvalStatus,
          rejectStatus: response.rejectStatus,
          role: role[1],
          accessiblePartners: role[0],
          accessRight: ""
          // response.roles[0].permissions == null?"":response.roles[0].permissions
         
          // accessRights:response.roles[1].permissions
         })
  
      
  
    })
  
  }

  save(){
    const link = updateUser.apiUrl.replace("{id}", this.data.userId);

 
    console.log(this.secondFormGroup.value);
  
    this.restClient.funcPost(this.secondFormGroup.value, link).subscribe((response) => {

      if(response.responseCode == "000"){
        this.notificationService.showNotificationLite('success', 'User updated successfully');
      }else if(response.responseCode == "999"){
        this.notificationService.showNotificationLite('danger', 'User update failed');
      }
      
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
 
