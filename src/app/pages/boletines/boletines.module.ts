import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { BoletinesComponent } from './boletines.component';
import { BoletinDialogComponent } from './boletin-dialog/boletin-dialog.component';
import {BoletinesService} from "./boletines.service";
import {UsersService} from "../users/users.service";
import {AuthGuard} from "../../shared/guard/auth-guard.service";

export const routes = [
  { path: '', canActivate: [AuthGuard],component: BoletinesComponent, pathMatch: 'full' }
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
    BoletinesComponent,
    BoletinDialogComponent
  ],
  entryComponents:[
    BoletinDialogComponent
  ],
    providers:[
        BoletinesService,
        UsersService
    ]
})
export class BoletinesModule { }
