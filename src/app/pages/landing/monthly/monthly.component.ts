import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api-service.service";
import {NguCarouselConfig} from "@ngu/carousel";
import {Settings} from "../../../app.settings.model";
import {AppSettings} from "../../../app.settings";

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html'
})
export class MonthlyComponent implements OnInit {
  public items = [
    { name: 'starter', price: 19, desc: 'Simplest package to get you started', count: '100', storage: '50 GB', support: false, ssl: false },
    { name: 'premium', price: 49, desc: 'The most popular package we offer', count: '2000', storage: '500 Gb', support: false, ssl: false },
    { name: 'business', price: 79, desc: 'The perfect package for your small business', count: 'Unlimited', storage: '1 TB', support: true, ssl: false },
    { name: 'enterprise', price: 159, desc: 'Our most advanced & complete package', count: 'Unlimited', storage: 'Unlimited', support: true, ssl: true }
  ]
  publicaciones: any[];
    public publicacionesCarouselConfig: NguCarouselConfig;
    public settings: Settings;

    constructor(public appSettings:AppSettings, private apiService:ApiService) {
      this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.apiService.getPublicacion().subscribe((res)=>{
      this.publicaciones = res['results']
    })
      this.publicacionesCarouselConfig = {
          grid: {xs: 1, sm: 2, md: 3, lg: 4, all: 0},
          slide: 1,
          speed: 400,
          interval: {
              timing: 4000
          },
          point: {
              visible: false
          },
          loop: true,
          touch: true,
          custom: 'banner',
          RTL: this.settings.rtl
      };
  }

    downloadBoletin(url){
        this.apiService.downloadPDF(url).subscribe(res => {
            const fileURL = URL.createObjectURL(res);
            window.open(fileURL, '_blank');
        });
    }
}
