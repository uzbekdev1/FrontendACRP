import { Component, OnInit } from '@angular/core';
import {AppSettings} from "../../../app.settings";
import {ApiService} from "../services/api-service.service";

@Component({
  selector: 'app-yearly',
  templateUrl: './yearly.component.html'
})
export class YearlyComponent implements OnInit {
  public items = [
    { name: 'starter', price: 59, desc: 'Simplest package to get you started', count: '100', storage: '50 GB', support: false, ssl: false },
    { name: 'premium', price: 179, desc: 'The most popular package we offer', count: '2000', storage: '500 Gb', support: false, ssl: false },
    { name: 'business', price: 599, desc: 'The perfect package for your small business', count: 'Unlimited', storage: '1 TB', support: true, ssl: false },
    { name: 'enterprise', price: 1799, desc: 'Our most advanced & complete package', count: 'Unlimited', storage: 'Unlimited', support: true, ssl: true }
  ]
    boletines: any[];
  constructor(private apiService:ApiService) { }

  ngOnInit() {
      this.apiService.getBoletines().subscribe((res)=>{
          this.boletines = res['results']
      })
  }
  downloadBoletin(url){
      this.apiService.downloadPDF(url).subscribe(res => {
          const fileURL = URL.createObjectURL(res);
          window.open(fileURL, '_blank');
      });
  }

}
