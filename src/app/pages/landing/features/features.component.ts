import { Component, OnInit } from '@angular/core';
import { LandingService } from '../landing.service';
import {ApiService} from "../services/api-service.service";
import {MatDialog} from "@angular/material";
import {DialogOverviewExampleDialog} from "../../ui/dialog/dialog.component";
import {ReadMoreDialogComponent} from "../read-more-dialog/read-more-dialog.component";

@Component({
    selector: 'app-features',
    templateUrl: './features.component.html',
    styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
    public features;
    noticias: any[];
    constructor(private landingService:LandingService, private apiService:ApiService, public dialog: MatDialog) { }

    ngOnInit() {
        this.features = this.landingService.getFeatures();
        this.apiService.getNoticia().subscribe((res)=>{
            this.noticias = res['results'];
        })
    }


    openDialog(noticia): void {
        let dialogRef = this.dialog.open(ReadMoreDialogComponent, {
            data:  noticia
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }
}
