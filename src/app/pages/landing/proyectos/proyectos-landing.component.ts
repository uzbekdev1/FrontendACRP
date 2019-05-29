import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { LandingService } from '../landing.service';
import {ApiService} from "../services/api-service.service";

@Component({
  selector: 'app-proyectos-landing',
  templateUrl: './proyectos-landing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProyectosLandingComponent implements OnInit {
  public works;
  public worksCarouselConfig: NguCarouselConfig;
  public settings: Settings;
    proyectos: any[];
  constructor(public appSettings:AppSettings, private landingService:LandingService, private apiService:ApiService) {
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() {    
    this.works = this.landingService.getWorks();
    this.worksCarouselConfig = {
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
      this.apiService.getProyecto().subscribe((res)=>{
          this.proyectos = res['results']
      })
  }

}