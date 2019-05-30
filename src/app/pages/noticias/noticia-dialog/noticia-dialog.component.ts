import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Noticia} from '../noticias.model';
import {ApiService} from "../../landing/services/api-service.service";
import {EventosService} from "../../eventos/eventos.service";
import {AuthService} from "../../login/auth.service";

@Component({
    selector: 'app-user-dialog',
    templateUrl: './noticia-dialog.component.html',
    styleUrls: ['./noticia-dialog.component.scss'],
    providers: [ApiService]
})
export class NoticiaDialogComponent implements OnInit {
    public form: FormGroup;

    @ViewChild('inputFile') picAddress: ElementRef;

    constructor(public dialogRef: MatDialogRef<NoticiaDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public noticia: Noticia,
                public authService: AuthService) {
        this.form = new FormGroup({
            id: new FormControl(''),
            titulo: new FormControl("", Validators.required),
            categoria: new FormControl("", Validators.required),
            descripcion: new FormControl('', Validators.required),
            imagen: new FormControl(''),
        });
    }

    ngOnInit() {
        if (this.noticia) {
            this.form.controls.id.setValue(this.noticia.id)
            this.form.controls.titulo.setValue(this.noticia.titulo)
            this.form.controls.descripcion.setValue(this.noticia.descripcion)
            this.form.controls.categoria.setValue(this.noticia.categoria)
        }
        else {
            this.noticia = new Noticia();
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    onFileChange(files) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.form.get('imagen').setValue(files[0]);
        }
    }
}
