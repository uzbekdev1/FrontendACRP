import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { MessagesService } from './messages.service';
import {ApiService} from "../../../pages/landing/services/api-service.service";
import {Evento} from "../../../pages/eventos/eventos.model";
import {promise} from "selenium-webdriver";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MessagesService, ApiService]
})
export class MessagesComponent implements OnInit {  
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public selectedTab:number=1;
  public messages:Array<Object>;
  public files:Array<Object>;
  public meetings:Array<Object>;
  public eventos: Evento[];
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
  constructor(private messagesService:MessagesService, private apiService: ApiService) {
    this.messages = messagesService.getMessages();
    this.files = messagesService.getFiles();
    this.meetings = messagesService.getMeetings();
    this.apiService.getEventos().subscribe((eventos: Evento[])=>{
        this.eventos = eventos;
    })
  }

  ngOnInit() {
  }

  openMessagesMenu() {
    this.trigger.openMenu();
    this.selectedTab = 0;
  }

  onMouseLeave(){
    this.trigger.closeMenu();
  }

  stopClickPropagate(event: any){
    event.stopPropagation();
    event.preventDefault();
  }

}
