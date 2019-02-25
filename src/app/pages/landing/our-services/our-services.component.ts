import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { LandingService } from '../landing.service';
import {ApiService} from "../services/api-service.service";

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurServicesComponent implements OnInit {
  public services;
  public eventosCarouselConfig: NguCarouselConfig;
  public settings: Settings;
  eventos: any[];

  constructor(public appSettings:AppSettings, private landingService:LandingService, private apiService:ApiService) {
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    this.services = this.landingService.getServices();    
    this.eventosCarouselConfig = {
      grid: {xs: 1, sm: 2, md: 3, lg: 4, all: 0},
      slide: 1,
      speed: 500,
      interval: {
        timing: 4000
      },
      point: {
        visible: true
      },
      loop: true,
      touch: true,
      custom: 'banner',
      RTL: this.settings.rtl
    };
    this.apiService.getEventos().subscribe((res)=>{
      this.eventos = res['results']
    })
  }

}