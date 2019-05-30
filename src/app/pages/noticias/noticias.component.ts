import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { Noticia} from './noticias.model';
import { UsersService } from '../users/users.service';
import {NoticiaDialogComponent} from "./noticia-dialog/noticia-dialog.component";
import {NoticiasService} from "./noticias.service";
import {FormGroup} from "@angular/forms";
import {AuthService} from "../login/auth.service";

@Component({
  selector: 'app-centros',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ UsersService ]
})
export class NoticiasComponent implements OnInit {
    public noticias: Noticia[];
    public page:any;
    public settings: Settings;
    public showSearch:boolean = false;
    public viewType:string = 'grid';
    constructor(public appSettings:AppSettings, 
                public dialog: MatDialog,
                public noticiaService:NoticiasService,
                public authService: AuthService){
        this.settings = this.appSettings.settings; 
    }

    ngOnInit() {
        this.getNoticias();
    }

    public getNoticias(): void {
        this.noticiaService.getNoticias().subscribe(noticias => {
            this.noticias = noticias;
            });
    }

    public addNoticia(form){
        const formData = new FormData()
        formData.append('titulo', form.titulo)
        formData.append('categoria', form.categoria)
        formData.append('imagen', form.imagen, form.imagen.name)
        formData.append('descripcion', form.descripcion)
        this.noticiaService.addNoticia(formData).subscribe(() => this.getNoticias());
    }

    public updateNoticia(form){
        const formData = new FormData()
        formData.append('titulo', form.titulo)
        formData.append('categoria', form.categoria)
        if(form.imagen.name && form.imagen.name != '')
            formData.append('imagen', form.imagen, form.imagen.name)
        formData.append('descripcion', form.descripcion)
        this.noticiaService.updateNoticia(form.id, formData).subscribe(() => this.getNoticias());
    }

    public deleteNoticia(noticia:Noticia){
        this.noticiaService.deleteNoticia(noticia).subscribe(() => this.getNoticias());
    }
    
    public changeView(viewType){
        this.viewType = viewType;
        this.showSearch = false;
    }

    public onPageChanged(event){
        this.page = event;
        this.getNoticias();
        document.getElementById('main').scrollTop = 0;
    }

    public openNoticiaDialog(noticia){
        let dialogRef = this.dialog.open(NoticiaDialogComponent, {
            data: noticia
        });
        dialogRef.afterClosed().subscribe(noticia => {
             if(noticia){
                 (noticia.id) ? this.updateNoticia(noticia) : this.addNoticia(noticia);
             }
        });
        this.showSearch = false;
    }

}