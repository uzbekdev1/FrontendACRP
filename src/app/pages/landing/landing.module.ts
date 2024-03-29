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
import {MonthlyComponent} from './monthly/monthly.component';
import {YearlyComponent} from './yearly/yearly.component';
import {PricingComponent} from './pricing/pricing.component';
import {TestimonialsComponent} from './testimonials/testimonials.component';
import {OurServicesComponent} from './our-services/our-services.component';
import {OurWorksComponent} from './our-works/our-works.component';
import {FeaturesComponent} from './features/features.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {ApiService} from "./services/api-service.service";
import {HttpClientModule} from "@angular/common/http";

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
        MonthlyComponent,
        YearlyComponent,
        PricingComponent,
        TestimonialsComponent,
        OurServicesComponent,
        OurWorksComponent,
        FeaturesComponent,
        ContactUsComponent
    ],
    providers: [
        LandingService, ApiService
    ]
})
export class LandingModule {
}
