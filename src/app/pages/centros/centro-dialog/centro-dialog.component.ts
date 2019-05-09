import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Centro} from '../centros.model';
import {ApiService} from "../../landing/services/api-service.service";

@Component({
    selector: 'app-user-dialog',
    templateUrl: './centro-dialog.component.html',
    styleUrls: ['./centro-dialog.component.scss'],
    providers: [ApiService]
})
export class CentroDialogComponent implements OnInit {
    public form: FormGroup;
    public passwordHide: boolean = true;

    centros: any[];
    @ViewChild('inputFile') picAddress: ElementRef;

    constructor(public dialogRef: MatDialogRef<CentroDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public center: Centro) {
        this.form = new FormGroup({
            id: new FormControl(''),
            nombre: new FormControl("", Validators.required),
            logo: new FormControl(''),
            direccion: new FormControl('', Validators.required),
        });
    }

    ngOnInit() {
        if (this.center) {
            this.form.controls.id.setValue(this.center.id)
            this.form.controls.nombre.setValue(this.center.nombre)
            this.form.controls.direccion.setValue(this.center.direccion)
        }
        else {
            this.center = new Centro();
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    onFileChange(files) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.form.get('logo').setValue(files[0]);
        }
    }
}
