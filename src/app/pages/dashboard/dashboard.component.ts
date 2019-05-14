import {Component, OnInit} from '@angular/core';
import {AuthService} from "../login/auth.service";
import {Member} from "../users/user.model";
import {skip} from "rxjs/operators";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    memberActive: Member;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.getMemberActive.pipe(skip(1)).
        subscribe((memberActive:Member)=>this.memberActive = memberActive)
    }

}
