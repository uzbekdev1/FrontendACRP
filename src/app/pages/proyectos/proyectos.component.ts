import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {UsersService} from '../users/users.service';
import {ProyectoDialogComponent} from "./proyecto-dialog/proyecto-dialog.component";
import {ProyectosService} from "./proyectos.service";
import {FormGroup} from "@angular/forms";
import {Proyecto} from "./proyectos.model";

@Component({
    selector: 'app-proyectos',
    templateUrl: './proyectos.component.html',
    styleUrls: ['./proyectos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ProyectosService]
})
export class ProyectosComponent implements OnInit {
    public proyectos: Proyecto[];
    public page: any;
    public settings: Settings;
    public showSearch: boolean = false;
    public viewType: string = 'list';

    constructor(
                public dialog: MatDialog,
                public proyectosService: ProyectosService) {
    }

    ngOnInit() {
        this.getProyectos();
    }

    public getProyectos(): void {
        this.proyectosService.getProyectos().subscribe(proyectos => {
            this.proyectos = proyectos;
            console.log(this.proyectos)
        });
    }

    public addProyecto(form) {
        const formData = new FormData()
        formData.append('titulo', form.titulo)
        formData.append('categoria', form.categoria)
        formData.append('pdf', form.pdf, form.pdf.name)
        formData.append('descripcion', form.descripcion)
        form.miembros.forEach((miembroId)=>formData.append('miembros', miembroId))
        this.proyectosService.addProyecto(formData).subscribe(() => this.getProyectos());
    }

    public updateProyecto(form) {
        const formData = new FormData()
        formData.append('titulo', form.titulo)
        formData.append('categoria', form.categoria)
        formData.append('pdf', form.pdf, form.pdf.name)
        formData.append('descripcion', form.descripcion)
        form.miembros.forEach((miembroId)=>formData.append('miembros', miembroId))
        this.proyectosService.updateProyecto(form.id, formData).subscribe(() => this.getProyectos());
    }

    public deleteProyecto(proyecto: Proyecto) {
        this.proyectosService.deleteProyecto(proyecto).subscribe(() => this.getProyectos());
    }

    public changeView(viewType) {
        this.viewType = viewType;
        this.showSearch = false;
    }

    public onPageChanged(event) {
        this.page = event;
        this.getProyectos();
        document.getElementById('main').scrollTop = 0;
    }

    public openProyectoDialog(proyecto) {
        let dialogRef = this.dialog.open(ProyectoDialogComponent, {
            data: proyecto
        });
        dialogRef.afterClosed().subscribe(proyecto => {
            if (proyecto) {
                (proyecto.id) ? this.updateProyecto(proyecto) : this.addProyecto(proyecto);
            }
        });
        this.showSearch = false;
    }

    downloadPdf(url) {
        this.proyectosService.downloadPDF(url).subscribe(res => {
            const fileURL = URL.createObjectURL(res);
            window.open(fileURL, '_blank');
        });
    }
}