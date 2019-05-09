import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Member} from '../../../users/user.model';
import {emailValidator} from "../../../../theme/utils/app-validators";

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-info-dialog.component.html',
    styleUrls: ['./user-info-dialog.component.scss'],
})
export class UserInfoDialogComponent implements OnInit {
    contactForm: FormGroup;
    constructor(public dialogRef: MatDialogRef<UserInfoDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public member: Member,
                public formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.contactForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, emailValidator])],
            subject: ['', Validators.required],
            message: ['', Validators.required]
        });
    }

    public onContactFormSubmit(values:Object):void {
        if (this.contactForm.valid) {
            console.log(values);
        }
    }

    close(): void {
        this.dialogRef.close();
    }

}
