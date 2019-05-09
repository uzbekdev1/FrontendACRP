import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Member} from "../../../pages/users/user.model";
import {UsersService} from "../../../pages/users/users.service";
import {AuthService} from "../../../pages/login/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  public memberActive: Member;
  constructor(private memberService: UsersService,  private authService: AuthService,
              public router:Router ) {}

  ngOnInit() {
    this.memberService.getMemberActive().subscribe((member: Member)=>this.memberActive = member);
  }
    logout(){
        if(this.authService.isAuthenticated())
            this.authService.logout()
        this.router.navigate(['/login'])
    }
}
