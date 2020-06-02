import { Component, OnInit } from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PartnerService } from 'src/app/services/partner/partner.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  partnerName: string;
  public searchFromLiveSummaryForSearchTrans = false;
  public navLinks: {label: string, path: string[], icon: string}[];

  constructor(
    private route: ActivatedRoute,
    private partnerService: PartnerService
    ) {
  }
  tVal = false;

  ngOnInit() {
    this.route.paramMap.subscribe(
      ((params: ParamMap) => {
        console.log(params.get('name'));
        this.partnerName = params.get('name');
        this.partnerService.setCurrentPartner(this.partnerName);
        this.navLinks  = [
          {label: 'Daily Live Summary', path: ['/app', 'partners', this.partnerName, 'livesummary'], icon: 'live_tv'},
          {label: 'Statistics', path: ['/app', 'partners', this.partnerName, 'stats'], icon: 'insert_chart'},
          {label: 'Search Transactions', path: ['/app', 'partners', this.partnerName, 'search'], icon: 'filter_list'},
          ];
      })
    );
  }


  tabChanged(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.tVal = true;
    }
  }
}
