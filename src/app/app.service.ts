import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  getLanguages(): Observable<any> {
    return this.http.get('assets/lang.json',{ headers: null });
  }
  getCampaignData(): Observable<any> {
    return this.http.get('assets/mock.json',{ headers: null });
  }
}
