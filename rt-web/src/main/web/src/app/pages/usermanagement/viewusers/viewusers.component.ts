import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RestclientService } from 'src/app/services/restclient/restclient.service';
import { getAllUsers, getAppprovedUsers, getUnAppprovedUsers, fetchPending, findById} from 'src/app/constants/constants';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user/user.service';
import { map, filter, mergeMap } from 'rxjs/operators';
import { IUserDetails } from 'src/app/models/iuserdetails';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Router } from '@angular/router';
import { DetailsmodComponent } from './detailsmod/detailsmod.component';
import { RejectdialogComponent } from './rejectdialog/rejectdialog.component';
import { EditmodalComponent } from './editmodal/editmodal.component';
import * as XLSX from 'xlsx';




@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.scss']
})



export class ViewusersComponent implements OnInit {
  // tableDataLoaded = false;
  @ViewChild("toggle") ref: ElementRef;
  @ViewChild("matexcel") exc: ElementRef;
  fileName = 'RT-Report.xlsx';
  checked:boolean
  dataSource : any = [];
 
  selectedData: String;
  res: IUserDetails[];
  doneAction: boolean = false;
  // responseDetails: IUserDetails[];
  // dataLoaded: boolean = false
  filterList = [];

  
  public displayedColumns = ['Email', 'First Name', 'Last Name', 'Status', 'Role Name','Action'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  clearAction: boolean = false
 
 

  constructor( private cdRef:ChangeDetectorRef,
    public dialog: MatDialog, private http: HttpClient, private restClient: RestclientService, private userService: UserService,private _router: Router) {
      // this.dataSource = new MatTableDataSource();
      this.dataSource.data = [];
     }

  ngOnInit(): void {

 
  

    this.selectedData = "All";
    this.findAllUsers();
    this.checked = true;
  
      

    let userData = this.userService.getUserInfo();
    let role =  userData.roles[0].roleName;
 
  if (role.includes('ECO')){
    this.filterList = [
      { name: 'All', value: 'All' },
      { name: 'Pending', value: 'Pending' },
      { name: 'Approved', value: 'Approved' },
      {name: 'Rejected', value: 'Rejected'},
      // {name: 'Deleted', value: 'Deleted'}
    ];
  
  } else {
    this.filterList = [
      { name: 'All', value: 'All' },
      { name: 'Pending', value: 'Pending' },
      { name: 'Approved', value: 'Approved' },
      {name: 'Rejected', value: 'Rejected'},
    ];
  
  }
   
    
  }



  selected(event) {
    console.log(event);
    this.selectedData = event.value;
  
    console.log(this.selectedData);

    if (this.selectedData =="Pending"){

      this.clearAction = false
      this.doneAction = true;
      this.fetchUnApprovedUsers();
    }
    else if (this.selectedData =="Approved"){
      this.clearAction = false
      this.doneAction = false;
      this.fetchApprovedUsers();
    }
    else if (this.selectedData =="All"){
      this.doneAction = false;
      this.clearAction = false;
      this.findAllUsers();
    }

    else if (this.selectedData == "Rejected"){
      this.clearAction = true
      this.doneAction =  false;
      this.fetchRejected();
    }

    // else if (this.selectedData == 'Deleted'){

    // }
    
}



  findAllUsers(){

    let userData = this.userService.getUserInfo()
    let role =  userData.roles[0].roleName.split(".")
    let roleName = role[0];

   return this.restClient.funcGet(getAllUsers.apiUrl).subscribe((response) => {
    if (response.length < 1) { 
      this.dataSource = new MatTableDataSource(this.res);
    }
    if(roleName != "ECO"){
      this.res = response.filter(response =>
        response.roles[0].roleName.includes(roleName)
        )
    } else {
      this.res = response;
    }
   
   console.log(this.res);

    

    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
    this.cdRef.detectChanges();
  },
    (error) => {
    console.log(error);
  });
   
       
}

fetchUnApprovedUsers(){
  

  
  let userData = this.userService.getUserInfo()
  let role =  userData.roles[0].roleName.split(".")
  let roleName = role[0];

  

 return this.restClient.funcGet(getUnAppprovedUsers.apiUrl).subscribe((response) => {

  console.log(response);
  if (response.length < 1) { 
    this.dataSource = new MatTableDataSource(this.res);
   
  }
  if(roleName != "ECO"){
    this.res = response.filter(response =>
      response.roles[0].roleName.includes(roleName)
      )
  } else {
    this.res = response;
  }
            

 console.log(this.res);

  this.dataSource = new MatTableDataSource(this.res);
  console.log(this.dataSource);
  this.dataSource.paginator = this.paginator;
},
  (error) => {
  console.log(error);
});

}

fetchApprovedUsers(){

  let userData = this.userService.getUserInfo()
  let role =  userData.roles[0].roleName.split(".")
  let roleName = role[0];

  

  return this.restClient.funcGet(getAppprovedUsers.apiUrl).subscribe((response) => {
    if (response.length < 1) { 
      this.dataSource = new MatTableDataSource(this.res);
    }

    if(roleName != "ECO"){
      this.res = response.filter(response =>
        response.roles[0].roleName.includes(roleName)
        )
    } else {
      this.res = response;
    }             
 
  console.log(this.res);
 
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
  },
    (error) => {
    console.log(error);
  });
  
}

fetchRejected (){
  let userData = this.userService.getUserInfo()
  let role =  userData.roles[0].roleName.split(".")
  let roleName = role[0];

  

  return this.restClient.funcGet(fetchPending.apiUrl).subscribe((response) => {
    if (response.length < 1) { 
      this.dataSource = new MatTableDataSource(this.res);
    }

    if(roleName != "ECO"){
      this.res = response.filter(response =>
        response.roles[0].roleName.includes(roleName)
        )
    } else {
      this.res = response;
    }             
 
  console.log(this.res);
 
    this.dataSource = new MatTableDataSource(this.res);
    this.dataSource.paginator = this.paginator;
  },
    (error) => {
    console.log(error);
  });
}

openDialog(userId): void {

  let firstName = this.userService.getUserInfo().firstName;

  let doneAction = this.doneAction;

  console.log(userId);

  console.log("hello");
  const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '250px';
    dialogConfig.data = {userId, firstName, doneAction};
    const dialogRef = this.dialog.open(DialogboxComponent, dialogConfig);
   
    
    dialogRef.afterClosed().subscribe( _ => {
      console.log('The dialog was closed');
      // this.fetchApprovedUsers();
      this.findAllUsers();
      this.selectedData = "All";
      this.doneAction = false; 
       this.clearAction = false;
    });
  

}

openEditDialog(userId): void {


  console.log("hello");
  const dialogConfig = new MatDialogConfig();

  dialogConfig.width = '600px';
  dialogConfig.height = '600px';
  dialogConfig.data = {userId};

  //  const responseDetails = this.getUserDetails(userId);
 
    // dialogConfig.data = responseDetails;
    // console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(EditmodalComponent, dialogConfig);
     
    dialogRef.afterClosed().subscribe( _ => {
      console.log('The dialog was closed');
      this.findAllUsers();
      this.selectedData = "All";
      this.doneAction = false; 
       this.clearAction = false;
    });
  

}


openrejectDialog(userId): void {

  let firstName = this.userService.getUserInfo().firstName;

  console.log(userId);

  console.log("hello");
  const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '250px';
    dialogConfig.data = {userId, firstName};
    const dialogRef = this.dialog.open(RejectdialogComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe( _ => {
      console.log('The dialog was closed');
      this.fetchApprovedUsers();
      this.selectedData = "Approved";
      this.doneAction = false; 
    });
  

}

openDialog2(userId): void {
  console.log(userId);

  console.log("hello");
  const dialogConfig = new MatDialogConfig();

  dialogConfig.width = '300px';
  dialogConfig.height = '400px';
    dialogConfig.data = {userId};
    const dialogRef = this.dialog.open(DetailsmodComponent, dialogConfig);
   
    
    dialogRef.afterClosed().subscribe( _ => {
      console.log('The dialog was closed');
    });
  

}

onChange(event){

  let u = this.ref;
  console.log(u);
  if (event.checked == false){
      this._router.navigate(["app/users"])
  }
}


downloadAsExcel() {
  try {
    
   
    console.log(this.exc);

    let element = this.exc.nativeElement;

    console.log(element);

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  } catch (error) {
    console.log(error)
  }
}

}
