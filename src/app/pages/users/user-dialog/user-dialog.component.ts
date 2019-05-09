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
                @Inject(MAT_DIALOG_DATA) public member: Member) {
        this.form = new FormGroup({
            centro: new FormControl("", Validators.required),
            resumenCV: new FormControl('', Validators.required),
            categoria: new FormControl('', Validators.required),
            // foto: new FormControl('', Validators.required),
            usuario:new FormGroup({
                first_name: new FormControl('', Validators.required),
                last_name: new FormControl('', Validators.required),
                username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
                password:  new FormControl(null, [Validators.required, Validators.minLength(6)]),
                email:  new FormControl(null, [Validators.required, Validators.email]),
            })
        });
    }

    ngOnInit() {
        this.apiService.getCentros().subscribe(res=>this.centros = res['results']);
        if (this.member) {
            this.form.get('usuario.first_name').setValue(this.member.usuario.first_name)
            this.form.get('usuario.last_name').setValue(this.member.usuario.last_name)
            this.form.get('usuario.username').setValue(this.member.usuario.username)
            this.form.get('usuario.email').setValue(this.member.usuario.email)
             this.form.controls.centro.setValue(this.member.centro.id);
            this.form.controls.categoria.setValue(this.member.categoria);
            this.form.controls.resumenCV.setValue(this.member.resumenCV);
        }
        else {
            this.member = new Member();
        }
    }

    close(): void {
        this.dialogRef.close();
    }

}
