import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {AgmCoreModule} from '@agm/core';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {NguCarouselModule} from '@ngu/carousel';
import {LandingService} from './landing.service';
import {LandingComponent} from './landing.component';
import {BoletinesLandingComponent} from './boletines/boletines-landing.component';
import {PricingComponent} from './pricing/pricing.component';
import {JuntaLandingComponent} from './testimonials/junta-landing.component';
import {EventosLandingComponent} from './eventos/eventos-landing.component';
import {ProyectosLandingComponent} from './proyectos/proyectos-landing.component';
import {NoticiasLandingComponent} from './noticias/noticias-landing.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {ApiService} from "./services/api-service.service";
import {HttpClientModule} from "@angular/common/http";
import {ReadMoreDialogComponent} from "./read-more-dialog/read-more-dialog.component";
import {UserInfoDialogComponent} from "./testimonials/user-info-dialog/user-info-dialog.component";
import {PublicacionesLandingComponent} from "./publicaciones/publicaciones-landing.component";

export const routes = [
    {path: '', component: LandingComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule,
        AgmCoreModule,
        HttpClientModule,
        ScrollToModule.forRoot(),
        NguCarouselModule
    ],
    declarations: [
        LandingComponent,
        ProyectosLandingComponent,
        BoletinesLandingComponent,
        PricingComponent,
        JuntaLandingComponent,
        EventosLandingComponent,
        PublicacionesLandingComponent,
        NoticiasLandingComponent,
        ContactUsComponent,
        ReadMoreDialogComponent,
        UserInfoDialogComponent,
    ],
    providers: [
        LandingService, ApiService
    ],
    entryComponents: [
        ReadMoreDialogComponent,
        UserInfoDialogComponent
    ]
})
export class LandingModule {
}
