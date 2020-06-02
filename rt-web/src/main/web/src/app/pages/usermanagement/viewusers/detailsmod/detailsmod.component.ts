import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RestclientService } from 'src/app/services/restclient/restclient.service';
import { getAllUsers, findById } from 'src/app/constants/constants';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IUserDetails } from 'src/app/models/iuserdetails';

@Component({
  selector: 'app-detailsmod',
  templateUrl: './detailsmod.component.html',
  styleUrls: ['./detailsmod.component.scss']
})
export class DetailsmodComponent implements OnInit {
  private userId: string = null;
  public userDetails
  
  
  constructor(private restClient: RestclientService, public dialogRef: MatDialogRef<DetailsmodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = null) { }
  
  ngOnInit(): void {
    const link = findById.apiUrl.replace("{id}", this.data.userId);
  
    this.restClient.funcGet(link).subscribe((response) => { 
  
      console.log(response);
      this.userDetails = response;
  
    })

  }
  
  
  close(): void {
    this.dialogRef.close();
  }

}





