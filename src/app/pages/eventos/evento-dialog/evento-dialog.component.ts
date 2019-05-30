import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from "../../landing/services/api-service.service";
import {Evento} from "../eventos.model";
import {Boletin} from "../../boletines/boletines.model";
import {AuthService} from "../../login/auth.service";

@Component({
    selector: 'app-evento-dialog',
    templateUrl: './evento-dialog.component.html',
    styleUrls: ['./evento-dialog.component.scss'],
    providers: [ApiService]
})
export class EventoDialogComponent implements OnInit {
    public form: FormGroup;
    public passwordHide: boolean = true;
    centros: any[];

    constructor(private apiService: ApiService, public dialogRef: MatDialogRef<EventoDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public evento: Evento, public authService: AuthService) {
        this.form = new FormGroup({
            id: new FormControl(''),
            nombre: new FormControl("", Validators.required),
            categoria: new FormControl('', Validators.required),
            descripcion: new FormControl('', Validators.required),
            direccion: new FormControl('', Validators.required),
            fecha: new FormControl('', Validators.required),
            centro: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {
        this.apiService.getCentros().subscribe(res=>this.centros = res['results']);
        if (this.evento) {
            this.form.controls.id.setValue(this.evento.id);
            this.form.controls.nombre.setValue(this.evento.nombre);
            this.form.controls.categoria.setValue(this.evento.categoria);
            this.form.controls.direccion.setValue(this.evento.direccion);
            this.form.controls.descripcion.setValue(this.evento.descripcion);
            this.form.controls.centro.setValue(this.evento.centro.id);
            const fecha = new Date(this.evento.fecha)
            this.form.controls.fecha.setValue(fecha);
        }
        else {
            this.evento = new Evento();
        }
    }

    close(): void {
        this.evento = this.form.getRawValue()
        this.dialogRef.close();
    }

}
