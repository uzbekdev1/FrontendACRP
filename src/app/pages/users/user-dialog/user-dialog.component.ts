import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Member} from '../user.model';
import {ApiService} from "../../landing/services/api-service.service";

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.scss'],
    providers: [ApiService]
})
export class UserDialogComponent implements OnInit {
    public form: FormGroup;
    public passwordHide: boolean = true;
    public colors = [
        {value: 'gradient-purple', viewValue: 'Purple'},
        {value: 'gradient-indigo', viewValue: 'Indigo'},
        {value: 'gradient-teal', viewValue: 'Teal'},
        {value: 'gradient-blue', viewValue: 'Blue'},
        {value: 'gradient-orange', viewValue: 'Orange'},
        {value: 'gradient-green', viewValue: 'Green'},
        {value: 'gradient-pink', viewValue: 'Pink'},
        {value: 'gradient-red', viewValue: 'Red'},
        {value: 'gradient-amber', viewValue: 'Amber'},
        {value: 'gradient-gray', viewValue: 'Gray'},
        {value: 'gradient-brown', viewValue: 'Brown'},
        {value: 'gradient-lime', viewValue: 'Lime'}
    ];
    centros: any[];

    constructor(private apiService: ApiService, public dialogRef: MatDialogRef<UserDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public miembro: Member) {
        this.form = new FormGroup({
            first_name: new FormControl('', Validators.required),
            last_name: new FormControl('', Validators.required),
            username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            miembro: new FormGroup({
                centro: new FormControl("", Validators.required),
                resumenCV: new FormControl('', Validators.required),
                categoria: new FormControl('', Validators.required),
                cargo: new FormControl('', Validators.required),
                foto: new FormControl(''),

            })
        });
    }

    ngOnInit() {
        this.apiService.getCentros().subscribe(res => this.centros = res['results']);
        if (this.miembro) {
            this.form.controls.first_name.setValue(this.miembro.usuario.first_name)
            this.form.controls.password.setValue('')
            this.form.controls.last_name.setValue(this.miembro.usuario.last_name)
            this.form.controls.username.setValue(this.miembro.usuario.username)
            this.form.controls.email.setValue(this.miembro.usuario.email)
            this.form.get('miembro.centro').setValue(this.miembro.centro.id);
            this.form.get('miembro.categoria').setValue(this.miembro.categoria);
            this.form.get('miembro.resumenCV').setValue(this.miembro.resumenCV);
        }
        else {
            this.miembro = new Member();
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    onFileChange(files) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.form.get('miembro').get('foto').setValue(files[0]);
        }
    }
}
