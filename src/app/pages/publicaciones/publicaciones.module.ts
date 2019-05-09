import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { PublicacionesComponent } from './publicaciones.component';
import { PublicacionDialogComponent } from './publicacion-dialog/publicacion-dialog.component';
import {PublicacionesService} from "./publicaciones.service";
import {UsersService} from "../users/users.service";
import {AuthGuard} from "../../shared/guard/auth-guard.service";

export const routes = [
  { path: '',canActivate: [AuthGuard], component: PublicacionesComponent, pathMatch: 'full' }
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
    PublicacionesComponent,
    PublicacionDialogComponent
  ],
  entryComponents:[
    PublicacionDialogComponent
  ],
    providers:[
        PublicacionesService,
        UsersService
    ]
})
export class PublicacionesModule { }
