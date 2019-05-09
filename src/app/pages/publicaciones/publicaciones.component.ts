import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { UsersService } from '../users/users.service';
import {PublicacionDialogComponent} from "./publicacion-dialog/publicacion-dialog.component";
import {PublicacionesService} from "./publicaciones.service";
import {FormGroup} from "@angular/forms";
import {Publicacion} from "./publicaciones.model";

@Component({
  selector: 'app-publiciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [PublicacionesService ]
})
export class PublicacionesComponent implements OnInit {
    public publicaciones: Publicacion[];
    public page:any;
    public settings: Settings;
    public showSearch:boolean = false;
    public viewType:string = 'list';
    constructor(public appSettings:AppSettings, 
                public dialog: MatDialog,
                public publicacionesService: PublicacionesService){
        this.settings = this.appSettings.settings; 
    }

    ngOnInit() {
        this.getPublicaciones();
    }

    public getPublicaciones(): void {
        this.publicacionesService.getPublicaciones().subscribe(publicaciones => {
            this.publicaciones = publicaciones;
            });
    }
    public addPublicacion(form){
        //console.log(form)
        const formData = new FormData()
        formData.append('titulo', form.titulo)
        formData.append('categoria', form.categoria)
        formData.append('fecha', form.fecha.toISOString().substr(0,10))
        formData.append('pdf', form.pdf, form.pdf.name)
        formData.append('descripcion', form.descripcion)
        form.autores.forEach((autorId)=>formData.append('autores', autorId))
        this.publicacionesService.addPublicacion(formData).subscribe(() => this.getPublicaciones());
    }

    public updatePublicacion(form){
        const formData = new FormData()
        formData.append('titulo', form.titulo)
        formData.append('categoria', form.categoria)
        formData.append('fecha', form.fecha.toISOString().substr(0,10))
        formData.append('pdf', form.pdf, form.pdf.name)
        formData.append('descripcion', form.descripcion)
        form.autores.forEach((autorId)=>formData.append('autores', autorId))
        this.publicacionesService.updatePublicacion(form.id, formData).subscribe(() => this.getPublicaciones());
    }
    public deletePublicacion(publicacion: Publicacion){
        this.publicacionesService.deletePublicacion(publicacion).subscribe(() => this.getPublicaciones());
    }
    
    public changeView(viewType){
        this.viewType = viewType;
        this.showSearch = false;
    }

    public onPageChanged(event){
        this.page = event;
        this.getPublicaciones();
        document.getElementById('main').scrollTop = 0;
    }

    public openPublicacionDialog(center){
        let dialogRef = this.dialog.open(PublicacionDialogComponent, {
            data: center
        });
        dialogRef.afterClosed().subscribe(center => {
             if(center){
                 (center.id) ? this.updatePublicacion(center) : this.addPublicacion(center);
             }
        });
        this.showSearch = false;
    }
    downloadPdf(url){
        this.publicacionesService.downloadPDF(url).subscribe(res => {
            const fileURL = URL.createObjectURL(res);
            window.open(fileURL, '_blank');
        });
    }
}