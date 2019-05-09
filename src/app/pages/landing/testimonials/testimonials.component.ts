import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { LandingService } from '../landing.service';
import {ApiService} from "../services/api-service.service";
import {forkJoin} from "rxjs";
import {UserDialogComponent} from "../../users/user-dialog/user-dialog.component";
import {MatDialog} from "@angular/material";
import {UserInfoDialogComponent} from "./user-info-dialog/user-info-dialog.component";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsComponent implements OnInit {
  public testimonials;
  public testimonialsCarouselConfig: NguCarouselConfig;
  public clients;
  public clientsCarouselConfig: NguCarouselConfig;
  public settings: Settings;
  junta: any[];
  centros: any[];
  constructor(public appSettings:AppSettings, public dialog: MatDialog, private landingService:LandingService, private apiService:ApiService) {
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    this.clients = this.landingService.getClients();
    this.testimonials = this.landingService.getTestimonials();   
    this.clientsCarouselConfig = {
      grid: {xs: 3, sm: 4, md: 5, lg: 6, all: 0},
      slide: 1,
      speed: 500,
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
    this.testimonialsCarouselConfig = {
      grid: {xs: 1, sm: 2, md: 3, lg: 3, all: 0},
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
      forkJoin(
          this.apiService.getCentros(),
          this.apiService.getMiembros()).subscribe(([res1, res2]: [any[], any[]]) => {
          this.centros = res1['results']
          this.junta = res2['results']
      })
  }

    public openMemberDialog(member){
        let dialogRef = this.dialog.open(UserInfoDialogComponent, {
            data: member
        });
        dialogRef.afterClosed().subscribe(user => {

        });
    }

}