import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {BoletinDialogComponent} from "./boletin-dialog/boletin-dialog.component";
import {BoletinesService} from "./boletines.service";
import {Boletin} from "./boletines.model";
import {AuthService} from "../login/auth.service";

@Component({
    selector: 'app-boletines',
    templateUrl: './boletines.component.html',
    styleUrls: ['./boletines.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [BoletinesService]
})
export class BoletinesComponent implements OnInit {
    public boletines: Boletin[];
    public page: any;
    public settings: Settings;
    public showSearch: boolean = false;
    public viewType: string = 'list';

    constructor(public appSettings: AppSettings,
                public dialog: MatDialog,
                public boletinesService: BoletinesService,
                public authService: AuthService) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {
        this.getBoletines();
    }

    public getBoletines(): void {
        this.boletinesService.getBoletines().subscribe(boletines => {
            this.boletines = boletines;
        });
    }

    public addBoletin(form) {
        //console.log(form)
        const formData = new FormData()
        formData.append('titulo', form.titulo)
        formData.append('fecha', form.fecha.toISOString().substr(0,10))
        formData.append('pdf', form.pdf, form.pdf.name)
        formData.append('descripcion', form.descripcion)
        form.autores.forEach((autorId)=>formData.append('autores', autorId))
        this.boletinesService.addBoletin(formData).subscribe(() => this.getBoletines());
    }

    public updateBoletin(form) {
        const formData = new FormData()
        if (form.logo){
            formData.append('logo', form.pdf, form.pdf.name)
        }
        formData.append('titulo', form.titulo)
        formData.append('fecha', form.fecha.toISOString().substr(0,10))
        formData.append('descripcion', form.descripcion)
        form.autores.forEach((autorId)=>formData.append('autores', autorId))

        this.boletinesService.updateBoletin(form.id, formData).subscribe(() => this.getBoletines());
    }

    public deleteProyecto(proyecto: Boletin) {
        this.boletinesService.deleteBoletin(proyecto).subscribe(() => this.getBoletines());
    }

    public changeView(viewType) {
        this.viewType = viewType;
        this.showSearch = false;
    }

    public onPageChanged(event) {
        this.page = event;
        this.getBoletines();
        document.getElementById('main').scrollTop = 0;
    }

    public openBoletinDialog(boletin) {
        let dialogRef = this.dialog.open(BoletinDialogComponent, {
            data: boletin
        });
        dialogRef.afterClosed().subscribe(boletin => {
            if (boletin) {
                (boletin.id) ? this.updateBoletin(boletin) : this.addBoletin(boletin);
            }
        });
        this.showSearch = false;
    }

    downloadPdf(url){
        this.boletinesService.downloadPDF(url).subscribe(res => {
            const fileURL = URL.createObjectURL(res);
            window.open(fileURL, '_blank');
        });
    }


}