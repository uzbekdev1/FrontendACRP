import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../../theme/utils/app-validators';
import {ApiService} from "../services/api-service.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public lat: number = 22.987381;
  public lng: number = -82.465532;
  public zoom: number = 12;
  public contactForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
        nombreRemitente: ['', Validators.required],
        correoRemitente: ['', Validators.compose([Validators.required, emailValidator])],
        telefonoRemitente: ['', Validators.required],
        mensaje: ['', Validators.required]
    });
  }

  public onContactFormSubmit(values:Object):void {
    if (this.contactForm.valid) {
      this.apiService.sendMensaje(values)
    }
  }

}
