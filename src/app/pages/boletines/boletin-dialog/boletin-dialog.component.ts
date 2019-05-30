import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from "../../landing/services/api-service.service";
import {Boletin} from "../boletines.model";
import {SelectionModel} from "@angular/cdk/collections";
import {Member} from "../../users/user.model";
import {Observable} from "rxjs";
import {AuthService} from "../../login/auth.service";

@Component({
    selector: 'app-proyecto-dialog',
    templateUrl: './boletin-dialog.component.html',
    styleUrls: ['./boletin-dialog.component.scss'],
    providers: [ApiService]
})
export class BoletinDialogComponent implements OnInit {
    public form: FormGroup;
    @ViewChild('inputFile') picAddress: ElementRef;
    members: Member[];

    constructor(private apiService: ApiService, public dialogRef: MatDialogRef<BoletinDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public boletin: Boletin, public authService: AuthService) {
        this.form = new FormGroup({
            id: new FormControl(''),
            titulo: new FormControl("", Validators.required),
            fecha: new FormControl(''),
            descripcion: new FormControl('', Validators.required),
            autores: new FormControl('', Validators.required),
            pdf: new FormControl(''),
        });
    }

    ngOnInit() {
        this.apiService.getMiembros().subscribe((members:any) => this.members = members.results)
        if (this.boletin) {
            this.form.controls.id.setValue(this.boletin.id)
            this.form.controls.titulo.setValue(this.boletin.titulo)
            const fecha = new Date(this.boletin.fecha)
            this.form.controls.fecha.setValue(fecha)
            this.form.controls.descripcion.setValue(this.boletin.descripcion)
            this.form.controls.autores.setValue(this.boletin.autores)
        }
        else {
            this.boletin = new Boletin();
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
