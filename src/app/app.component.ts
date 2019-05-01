import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BSAssignment';
  campaignData: any;
  tableData: any;
  currentTabData: any;
  languageOptions:any;
  constructor(private appService: AppService,
   private translate: TranslateService) {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
  }

  ngOnInit() {
    this.getLanguages();
    this.getCampaignData();
  }

  getLanguages() {
    this.appService.getLanguages().subscribe(res => {
      if (res.success) {
        this.languageOptions=res['data'];
        console.log('t',this.languageOptions);
      }
    }, err => {
      console.log('err', err);
    }
    );
  }

  switchLanguage(language: string) {
          this.translate.use(language['id']);
          this.translate.currentLang = language['id'];
  }

  getCampaignData() {
    this.appService.getCampaignData().subscribe(res => {
      if (res.success) {
        this.campaignData = res['data'];
        this.tableData = res['data'][0]['data'];
        this.currentTabData = res['data'][0];
        this.tableData.dateDifference = this.getDateDifference(res['data'][0]['data']['date']);
      }
    }, err => {
      console.log('err', err);
    }
    );
  }

  showTabData(data) {
    this.currentTabData = data;
    this.tableData = data['data'];
    this.tableData.dateDifference = this.getDateDifference(data['data']['date']);
  }

  getDateDifference(date) {
    const start = moment(new Date());
    const end = moment(new Date(date));
    const diff = start.diff(end, 'days');
    return diff;
  }
}
