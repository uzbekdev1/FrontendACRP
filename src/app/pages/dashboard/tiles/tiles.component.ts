import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {
@Input() memberActive
  constructor() { }

  ngOnInit() {
  }

}
