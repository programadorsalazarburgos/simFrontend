import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CountToModule } from 'angular-count-to';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from '../../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DefaultComponent } from './default/default.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { PerfilArtistaComponent } from './perfil-artista/perfil-artista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventoArtistaComponent } from './evento-artista/evento-artista.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgSelectModule } from "@ng-select/ng-select";
import { TagInputModule } from 'ngx-chips';
import { AngularEditorModule } from '@kolkov/angular-editor';


TagInputModule.withDefaults({
  tagInput: {
    placeholder: 'Digita tu información',
    secondaryPlaceholder:'Digita tu información'
  }
})

@NgModule({
  declarations: [DefaultComponent, EcommerceComponent, PerfilArtistaComponent, EventoArtistaComponent],
  imports: [
    CommonModule,
    ChartistModule,
    ChartsModule,
    NgApexchartsModule,
    SharedModule,
    CarouselModule,
    CKEditorModule,
    CountToModule,
    NgbModule,
    FormsModule,
    LeafletModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    DashboardRoutingModule,
    NgSelectModule,
    TagInputModule,
    AngularEditorModule
  ]
})
export class DashboardModule { }
