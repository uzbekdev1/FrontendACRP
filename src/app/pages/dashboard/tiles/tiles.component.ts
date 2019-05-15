import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../../users/user.model";
import {AuthService} from "../../login/auth.service";

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {
  memberActive: Member;
  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.authService.getMemberActive.subscribe((member: Member)=>this.memberActive = member);
  }

}
