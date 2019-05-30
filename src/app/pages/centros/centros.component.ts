import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {Centro} from './centros.model';
import { UsersService } from '../users/users.service';
import {CentroDialogComponent} from "./centro-dialog/centro-dialog.component";
import {CentersService} from "./centers.service";
import {FormGroup} from "@angular/forms";
import {AuthService} from "../login/auth.service";

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ UsersService ]
})
export class CentrosComponent implements OnInit {
    public centers: Centro[];
    public page:any;
    public settings: Settings;
    public showSearch:boolean = false;
    public viewType:string = 'grid';
    constructor(public appSettings:AppSettings, 
                public dialog: MatDialog,
                public centerService:CentersService,
                public authService: AuthService){
        this.settings = this.appSettings.settings; 
    }

    ngOnInit() {
        this.getCenters();
    }

    public getCenters(): void {
        this.centerService.getCenters().subscribe(centers => {
            this.centers = centers;
            });
    }
    public addCenter(form){
        //console.log(form)
        const formData = new FormData()
        formData.append('logo', form.logo, form.logo.name)
        formData.append('direccion', form.direccion)
        formData.append('nombre', form.nombre)
        this.centerService.addCenter(formData).subscribe(() => this.getCenters());
    }
    public updateCenter(form){
        const formData = new FormData()
        if(form.logo)
            formData.append('logo', form.logo, form.logo.name)
        formData.append('direccion', form.direccion)
        formData.append('nombre', form.nombre)
        this.centerService.updateCenter(form.id, formData).subscribe(() => this.getCenters());
    }
    public deleteCenter(center:Centro){
        this.centerService.deleteCenter(center).subscribe(() => this.getCenters());
    }
    
    public changeView(viewType){
        this.viewType = viewType;
        this.showSearch = false;
    }

    public onPageChanged(event){
        this.page = event;
        this.getCenters();
        document.getElementById('main').scrollTop = 0;
    }

    public openCenterDialog(center){
        let dialogRef = this.dialog.open(CentroDialogComponent, {
            data: center
        });
        dialogRef.afterClosed().subscribe(center => {
             if(center){
                 (center.id) ? this.updateCenter(center) : this.addCenter(center);
             }
        });
        this.showSearch = false;
    }

}