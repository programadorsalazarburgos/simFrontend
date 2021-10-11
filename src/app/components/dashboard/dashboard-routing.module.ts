import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { PerfilArtistaComponent } from './perfil-artista/perfil-artista.component';
import { EventoArtistaComponent } from './evento-artista/evento-artista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        component: DefaultComponent
      },
      {
        path:'ecommerce',
        component:EcommerceComponent
      },
      {
        path:'artista',
        component:PerfilArtistaComponent
      },
      {
        path:'evento',
        component:EventoArtistaComponent
      },
     
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
