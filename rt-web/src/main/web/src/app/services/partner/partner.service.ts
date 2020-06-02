import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private currentPartner: string;
  private companyOfLoggedInUser: string;
  private partnerMapUI = {
    alipay: 'Alipay',
    alip: 'AliPay',
    ant: 'AliPay',
    nibss: 'NIBSS'
  };
  private partnerMapDB = {
    alipay: 'ALIP',
    alip: 'ALIP',
    ant: 'ALIP',
    nibss: 'NIBSS'
  };

  searchFromLiveSummaryForSearchTrans = false;
  liveSummaryParams: {channel: string, status: string, startDate: string, endDate: string, sendOrReceive: string};

  getSearchFromLiveSummaryForSearchTrans() {
    return this.searchFromLiveSummaryForSearchTrans;
}
  getSearchFromLiveSummaryForSearchTransParameters() {
    return this.liveSummaryParams;
  }

  async navigationFromDashboardToSearchTrans() {


  }


  setSearchForSearchTransParameters(transactionChannel: string, status: string, startDate: string, endDate: string, sendOrReceive: string) {
    this.liveSummaryParams = {
      channel: transactionChannel,
      status,
      startDate,
      endDate,
      sendOrReceive
    };
  }


  setSearchFromLiveSummaryForSearchTrans(value: boolean) {
    this.searchFromLiveSummaryForSearchTrans = value;
}

  constructor(private userService: UserService) { }

  convertDBValuePartnerNameToUIPartnerName(value) {
    const lowerRepresentation = value.toLowerCase();
    return this.partnerMapUI[lowerRepresentation] !== '' ?  this.partnerMapUI[lowerRepresentation] : value;
  }

    // current partner based on the page the user is on
  getCurrentPartner(): string {
    return this.currentPartner;
  }

  // current partner value based on the page the user is on - which varies and is not dependent on login info
  getCurrentPartnerValue(): string {
    console.log(this.currentPartner);
    console.log(this.companyOfLoggedInUser);
    if (this.companyOfLoggedInUser === 'ECOBANK') {
      return this.partnerMapDB[this.currentPartner.toLowerCase()];
    } else if (this.companyOfLoggedInUser === 'ALIP') {
      return 'ALIP';
    }  else if (this.companyOfLoggedInUser === 'NIBSS') {
      return 'NIBSS';
    }  else {
      return this.companyOfLoggedInUser;
    }
  }

  setCurrentPartner(partnerName): void {

    this.currentPartner = partnerName;
    console.log(this.currentPartner);
  }

  // this is constant and will usually be set on login
  getCompanyOfLoggedInUser() {
    console.log(this.companyOfLoggedInUser);
    return this.companyOfLoggedInUser;
  }

  setCompanyOfLoggedInUser(user): void {

    const userData = this.userService.getUserInfo();
    const roleName =  userData.roles[0].roleName;
    console.log(userData);
    console.log(user);
    // let roleName =  user.roles[0].roleName

    if (roleName.includes('ECO')) {
      this.companyOfLoggedInUser = 'ECOBANK';
    } else if (roleName.includes('ALIP')) {
      this.companyOfLoggedInUser = 'ALIP';
    } else if (roleName.includes('NIBSS')) {
      this.companyOfLoggedInUser = 'NIBSS';
    } else {
      this.companyOfLoggedInUser = 'Unauthorized';
    }
  }

}
