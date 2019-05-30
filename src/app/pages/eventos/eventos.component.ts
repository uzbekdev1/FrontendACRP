import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {EventoDialogComponent} from "./evento-dialog/evento-dialog.component";
import {EventosService} from "./eventos.service";
import {Evento} from "./eventos.model";
import {AuthService} from "../login/auth.service";

@Component({
    selector: 'app-evento',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [EventosService]
})
export class EventosComponent implements OnInit {
    public eventos: Evento[];
    public page: any;
    public settings: Settings;
    public showSearch: boolean = false;
    public viewType: string = 'grid';

    constructor(public appSettings: AppSettings,
                public dialog: MatDialog,
                public eventosService: EventosService,
                public authService: AuthService) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {
        this.getEventos();
    }

    public getEventos(): void {
        this.eventosService.getEventos().subscribe(eventos => {
            this.eventos = eventos;
        });
    }
    
    public addEvento(evento) {
        this.eventosService.addEvento(evento).subscribe(() => this.getEventos());
    }

    public updateEvento(evento) {
        this.eventosService.updateEvento(evento).subscribe(() => this.getEventos());
    }

    public deleteEvento(evento: Evento) {
        this.eventosService.deleteEvento(evento).subscribe(() => this.getEventos());
    }

    public changeView(viewType) {
        this.viewType = viewType;
        this.showSearch = false;
    }

    public onPageChanged(event) {
        this.page = event;
        this.getEventos();
        document.getElementById('main').scrollTop = 0;
    }

    public openEventoDialog(evento) {
        let dialogRef = this.dialog.open(EventoDialogComponent, {
            data: evento
        });
        dialogRef.afterClosed().subscribe(evento => {
            if (evento) {
                (evento.id) ? this.updateEvento(evento) : this.addEvento(evento);
            }
        });
        this.showSearch = false;
    }

}