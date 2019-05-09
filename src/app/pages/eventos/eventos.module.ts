import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { EventosComponent } from './eventos.component';
import { EventoDialogComponent } from './evento-dialog/evento-dialog.component';
import {EventosService} from "./eventos.service";
import {AuthGuard} from "../../shared/guard/auth-guard.service";

export const routes = [
  { path: '',canActivate: [AuthGuard], component: EventosComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule    
  ],
  declarations: [
    EventosComponent,
    EventoDialogComponent
  ],
  entryComponents:[
    EventoDialogComponent
  ],
    providers:[
        EventosService
    ]
})
export class EventosModule { }
