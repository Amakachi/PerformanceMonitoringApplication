import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, EmailValidator } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RestclientService } from 'src/app/services/restclient/restclient.service';
import { fetchAdUser, createCustomUser } from 'src/app/constants/constants';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { MatStepper } from '@angular/material/stepper';
import * as $ from 'jquery';
import 'bootstrap-notify';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router, NavigationEnd } from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {

  @ViewChild('stepper') private myStepper: MatStepper;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedIndex: number = 0;
  per : any =[]
  rolesList:any =[]
  count : number = 0
 



  ecoBankList = [
    { name: 'AliPay', value: 'ALIP' },
    // { name: 'NIBSS', value: 'NIBSS' },
    { name: 'Ecobank', value: 'ECO' }
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

  rolesL = [
    "Admin", "User"
  ]

  roleListEco =[
    "Admin"
  ]

  accessRightList = [
    "Reporting and Monitoring", "Monitoring"
  ]



  clicked: boolean = false;
  ecoUser: boolean = null
  loading: boolean = false;
  isLoading: boolean = false;
  permission: any;
  rolel: any;


  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.pattern("^.*(?=.{8,})[\\w.]+@[\\w.]+[.][a-zA-Z0-9]+$")]),
      // 'password': new FormControl(''),
      // 'confirmPassword': new FormControl('', [this.validateService.passwordConfirm]),
      'firstName': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'lastName': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'contactAddress': new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      // 'username': new FormControl(null, [Validators.required]),
      // 'userAffiliate': new FormControl(null, [Validators.required]),
    }
      // {validators : this.validateService.checkPasswords}

      
    )



    this.secondFormGroup = new FormGroup({
      'accessiblePartners': new FormControl(null, [Validators.required]),
      'accessRight': new FormControl(null, [Validators.required]),
      'role': new FormControl(null, [Validators.required])
    })

  }

  //Mat Slide Button

  onChange(event){
    if(event.checked == true){
      console.log("hello");
      this._router.navigate(["app/viewusers"])
    }

  }


  //Create User

  handleUserRequest() {
    this.loading = true;
    this.isLoading = true;

    const formValues = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value
    };

    console.log(formValues);

   

    this.restClient.funcPost(formValues, createCustomUser.apiUrl).subscribe((Response) => {
   
      this.loading = false;
      if (Response.responseCode == "000") {
        this.notificationService.showNotificationLite('success', 'User creation successful');
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this._router.navigate(["app/viewusers"]);

      } else if (Response.responseCode == "666") {
        this.notificationService.showNotificationLite('danger', 'User already exists')


      } else if(Response.responseCode == "777"){
        this.notificationService.showNotificationLite('danger', Response.responseMessage);
      }
      
      else {
        this.notificationService.showNotificationLite('danger', 'User registration failed')


      }
    })

    
    this.ecoUser = null;
    
  }

  setIndex(event) {
    this.selectedIndex = event.selectedIndex;
  }

  triggerClick() {
   

    if (this.selectedIndex == 0) {
      this.isLoading = false;      
    }
  }


  // FOR THE  CHIPS
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  partnerCtrl = new FormControl();
  filteredPartners: Observable<string[]>;
  partners: string[] = ['NIBSS'];
  allPartners: string[] = ['ALL', 'NIBSS', 'ANT'];

  @ViewChild('partnerInput') partnerInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private restClient: RestclientService, private validateService: ValidateService, private notificationService: NotificationService, private _router: Router, private userService: UserService) {
    this.filteredPartners = this.partnerCtrl.valueChanges.pipe(
      startWith(null),
      map((partner: string | null) => partner ? this._filter(partner) : this.allPartners.slice()));

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add to partner
    if ((value || '').trim()) {
      this.partners.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.partnerCtrl.setValue(null);
  }

  remove(partner: string): void {
    const index = this.partners.indexOf(partner);

    if (index >= 0) {
      this.partners.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.partners.push(event.option.viewValue);
    this.partnerInput.nativeElement.value = '';
    this.partnerCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allPartners.filter(partner => partner.toLowerCase().indexOf(filterValue) === 0);
  }

  fetchAdUser(data: any) {

    if (data.includes("@ecobank.com")) {
      const link = fetchAdUser.apiUrl.replace("{email}", data)
      this.restClient.funcGet(link).subscribe((Response) => {

        if (Response.responseCode == "000") {
          this.firstFormGroup.setValue({
            firstName: Response.data.firstName,
            lastName: Response.data.lastName,
            email: Response.data.email,
            phoneNumber: Response.data.phoneNumber,
            contactAddress:Response.data.contactAddress
          });
          this.ecoUser = true;
       
        } else if (Response.responseCode == "999") {

          this.notificationService.showNotificationLite('danger', 'User does not exist')

        }
      })
    }


  }



  getPartnersList (){
    let userData = this.userService.getUserInfo()
    let roleName =  userData.roles[0].roleName
    const user = this.firstFormGroup.value;


    if(roleName == "ECO.Admin" && !user.email.includes('ecobank.com')){
      this.per.push(this.nonEcobankList)
      this.rolesList.push(this.roleListEco)
    }
    // else if(roleName == "NIBSS.Admin"){
    //   this.per.push(this.nibssList)
    //   this.rolesList.push(this.rolesL)
    // }
    else if(roleName == "ALIP.Admin"){
      this.per.push(this.alipayList);
      this.rolesList.push(this.rolesL)
    }else if(roleName == "ECO.Admin"){
      this.per.push(this.ecoBankList);
      this.rolesList.push(this.rolesL)
      
    }

    this.permission = this.per[this.count];
    this.rolel = this.rolesList[this.count];

    this.count++

    console.log(this.rolel)
  }


}
