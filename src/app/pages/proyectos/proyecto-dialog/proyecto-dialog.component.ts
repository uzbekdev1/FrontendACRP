import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from "../../landing/services/api-service.service";
import {Proyecto} from "../proyectos.model";
@Component({
    selector: 'app-proyecto-dialog',
    templateUrl: './proyecto-dialog.component.html',
    styleUrls: ['./proyecto-dialog.component.scss'],
    providers: [ApiService]
})
export class ProyectoDialogComponent implements OnInit {
    public form: FormGroup;
    members: any[];
    @ViewChild('inputFile') picAddress: ElementRef;

    constructor(private apiService: ApiService, public dialogRef: MatDialogRef<ProyectoDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public proyecto: Proyecto) {
        this.form = new FormGroup({
            id: new FormControl(''),
            titulo: new FormControl("", Validators.required),
            descripcion: new FormControl('', Validators.required),
            miembros: new FormControl('', Validators.required),
            pdf: new FormControl(''),
            categoria: new FormControl(''),
        });
    }

    ngOnInit() {
        this.apiService.getMiembros().subscribe((members:any) => this.members = members.results)
        if (this.proyecto) {
            this.form.controls.id.setValue(this.proyecto.id)
            this.form.controls.titulo.setValue(this.proyecto.titulo)
            this.form.controls.descripcion.setValue(this.proyecto.descripcion)
            this.form.controls.categoria.setValue(this.proyecto.categoria)
            this.form.controls.miembros.setValue(this.proyecto.autores)
        }
        else {
            this.proyecto = new Proyecto();
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
