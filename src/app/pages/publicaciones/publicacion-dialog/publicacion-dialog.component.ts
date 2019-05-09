import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from "../../landing/services/api-service.service";
import {Publicacion} from "../publicaciones.model";
import {Boletin} from "../../boletines/boletines.model";
import {Member} from "../../users/user.model";

@Component({
    selector: 'app-publicacion-dialog',
    templateUrl: './publicacion-dialog.component.html',
    styleUrls: ['./publicacion-dialog.component.scss'],
    providers: [ApiService]
})
export class PublicacionDialogComponent implements OnInit {
    public form: FormGroup;
    members: Member[];
    @ViewChild('inputFile') picAddress: ElementRef;

    constructor(private apiService: ApiService, public dialogRef: MatDialogRef<PublicacionDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public publicacion: Publicacion) {
        this.form = new FormGroup({
            id: new FormControl(''),
            titulo: new FormControl("", Validators.required),
            fecha: new FormControl(''),
            descripcion: new FormControl('', Validators.required),
            autores: new FormControl('', Validators.required),
            pdf: new FormControl(''),
            categoria: new FormControl(''),
        });
    }

    ngOnInit() {
        this.apiService.getMiembros().subscribe((members:any) => this.members = members.results)
        if (this.publicacion) {
            this.form.controls.id.setValue(this.publicacion.id)
            this.form.controls.titulo.setValue(this.publicacion.titulo)
            const fecha = new Date(this.publicacion.fecha)
            this.form.controls.fecha.setValue(fecha)
            this.form.controls.descripcion.setValue(this.publicacion.descripcion)
            this.form.controls.categoria.setValue(this.publicacion.categoria)
            this.form.controls.autores.setValue(this.publicacion.autores)
        }
        else {
            this.publicacion = new Publicacion();
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    onFileChange(files) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.form.get('pdf').setValue(files[0]);
        }
    }
}
