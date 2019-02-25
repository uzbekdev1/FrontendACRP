import { Component, OnInit } from '@angular/core';
import { LandingService } from '../landing.service';
import {ApiService} from "../services/api-service.service";

@Component({
    selector: 'app-features',
    templateUrl: './features.component.html',
    styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
    public features;
    noticias: any[];
    constructor(private landingService:LandingService, private apiService:ApiService) { }

    ngOnInit() {
        this.features = this.landingService.getFeatures();
        this.apiService.getNoticia().subscribe((res)=>{
            this.noticias = res['results'];
        })
    }

}