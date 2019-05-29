import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import {AuthGuard} from "./shared/guard/auth-guard.service";

export const routes: Routes = [
    {
        path: 'home',
        component: PagesComponent,  canActivate: [AuthGuard], children: [
            { path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' } },
            { path: 'centros', loadChildren: './pages/centros/centros.module#CentrosModule', data: { breadcrumb: 'Centros' } },
            { path: 'miembros', loadChildren: './pages/users/users.module#UsersModule', data: { breadcrumb: 'Miembros' } },
            { path: 'proyectos', loadChildren: './pages/proyectos/proyectos.module#ProyectosModule', data: { breadcrumb: 'Proyectos' }  },
            { path: 'publicaciones', loadChildren: './pages/publicaciones/publicaciones.module#PublicacionesModule', data: { breadcrumb: 'Publicaciones' } },
            { path: 'boletines', loadChildren: './pages/boletines/boletines.module#BoletinesModule', data: { breadcrumb: 'Boletines' } },
            { path: 'eventos', loadChildren: './pages/eventos/eventos.module#EventosModule', data: { breadcrumb: 'Eventos' } },
            { path: 'noticias', loadChildren: './pages/noticias/noticias.module#NoticiasModule', data: { breadcrumb: 'Noticias' } },

        ]
    },
    { path: '', loadChildren: './pages/landing/landing.module#LandingModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
    // useHash: true
});