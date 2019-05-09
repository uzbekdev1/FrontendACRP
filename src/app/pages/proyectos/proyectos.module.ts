import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { ProyectosComponent } from './proyectos.component';
import { ProyectoDialogComponent } from './proyecto-dialog/proyecto-dialog.component';
import {ProyectosService} from "./proyectos.service";
import {UsersService} from "../users/users.service";
import {AuthGuard} from "../../shared/guard/auth-guard.service";

export const routes = [
  { path: '',canActivate: [AuthGuard], component: ProyectosComponent, pathMatch: 'full' }
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
    ProyectosComponent,
    ProyectoDialogComponent
  ],
  entryComponents:[
    ProyectoDialogComponent
  ],
    providers:[
        ProyectosService, UsersService
    ]
})
export class ProyectosModule { }
