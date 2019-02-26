import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'read-more-dialog',
    templateUrl: 'read-more-dialog.component.html',
})
export class ReadMoreDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ReadMoreDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
