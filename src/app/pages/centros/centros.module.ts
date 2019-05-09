import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { CentrosComponent } from './centros.component';
import { CentroDialogComponent } from './centro-dialog/centro-dialog.component';
import {CentersService} from "./centers.service";
import {AuthGuard} from "../../shared/guard/auth-guard.service";

export const routes = [
  { path: '',  canActivate: [AuthGuard], component: CentrosComponent, pathMatch: 'full' }
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
    CentrosComponent,
    CentroDialogComponent
  ],
  entryComponents:[
    CentroDialogComponent
  ],
    providers:[
        CentersService
    ]
})
export class CentrosModule { }
