import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-partnerdashboard',
  templateUrl: './partnerdashboard.component.html',
  styleUrls: ['./partnerdashboard.component.css']
})
export class PartnerdashboardComponent implements OnInit {

  tVal = false;
  public navLinks: {label: string, path: string[], icon: string}[] = [
    {label: 'Live Summary', path: ['/app', 'home', 'livesummary'], icon: 'live_tv'},
    {label: 'Statistics', path: ['/app', 'home', 'stats'], icon: 'insert_chart'},
    {label: 'Search Transactions', path: ['/app', 'home', 'search'], icon: 'filter_list'},
    ];

  constructor() { }

  ngOnInit() {
  }

  tabChanged(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.tVal = true;
    }
  }

}
