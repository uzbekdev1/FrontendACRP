import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { NoticiasComponent } from './noticias.component';
import { NoticiaDialogComponent } from './noticia-dialog/noticia-dialog.component';
import {NoticiasService} from "./noticias.service";
import {AuthGuard} from "../../shared/guard/auth-guard.service";

export const routes = [
  { path: '', canActivate: [AuthGuard], component: NoticiasComponent, pathMatch: 'full' }
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
    NoticiasComponent,
    NoticiaDialogComponent
  ],
  entryComponents:[
    NoticiaDialogComponent
  ],
    providers:[
        NoticiasService
    ]
})
export class NoticiasModule { }
