import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {Member, User} from './user.model';
import { UsersService } from './users.service';
import {UserDialogComponent} from "./user-dialog/user-dialog.component";
import {AuthService} from "../login/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ UsersService ]
})
export class UsersComponent implements OnInit {
    public members: Member[];
    public searchText: string;
    public page:any;
    public settings: Settings;
    public showSearch:boolean = false;
    public viewType:string = 'grid';
    constructor(public appSettings:AppSettings, 
                public dialog: MatDialog,
                public usersService:UsersService,
                public authService: AuthService){
        this.settings = this.appSettings.settings; 
    }

    ngOnInit() {
        this.getMembers();
    }

    public getMembers(): void {
        this.members = null; //for show spinner each time
        this.usersService.getMembers().subscribe(users => {
            this.members = users;
            });
    }
    public addUser(user:User){
        this.usersService.addUser(user).subscribe(user => this.getMembers());
    }
    public updateUser(user:User){
        this.usersService.updateMember(user).subscribe(user => this.getMembers());
    }
    public deleteMember(user:User){
       this.usersService.deleteUser(user.id).subscribe(user => this.getMembers());
    }
    
    public changeView(viewType){
        this.viewType = viewType;
        this.showSearch = false;
    }

    public onPageChanged(event){
        this.page = event;
        this.getMembers();
        document.getElementById('main').scrollTop = 0;
    }

    public openMemberDialog(user){
        let dialogRef = this.dialog.open(UserDialogComponent, {
            data: user
        });
        dialogRef.afterClosed().subscribe(user => {
            if(user){
                (user.id) ? this.updateUser(user) : this.addUser(user);
            }
        });
        this.showSearch = false;
    }

}