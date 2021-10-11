import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ArtistaService {
  private urlEndPoint: string = 'http://localhost:8002';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private httpHeaders2 = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private router: Router) {}

  // creacionVoluntariosIndependientes(
  //   archivo1: File,
  //   archivo2: File,
  //   archivo3: File,
  //   archivo4: File,
  //   empresa,
  //   persona,
  //   afiliacion,
  //   solicitud,
  //   pagoPendienteIndepVolunt
  // ): Observable<HttpEvent<{}>> {
  //   let formData = new FormData();
  //   formData.append('archivo1', archivo1);
  //   formData.append('archivo2', archivo2);
  //   formData.append('archivo3', archivo3);
  //   formData.append('archivo4', archivo4);
  //   formData.append('empresa', empresa);
  //   formData.append('persona', persona);
  //   formData.append('afiliacion', afiliacion);
  //   formData.append('solicitud', solicitud);
  //   formData.append('pagoPendienteIndepVolunt', pagoPendienteIndepVolunt);
  //   const req = new HttpRequest(
  //     'POST',
  //     `${this.urlEndPointAcceso}/saveVI`,
  //     formData,
  //     {
  //       reportProgress: true,
  //     }
  //   );
  //   return this.http.request(req).pipe(
  //     catchError((e) => {
  //       Swal.fire('Error al crear la solicitud', e.error.mensaje, 'error');
  //       return throwError(e);
  //     })
  //   );
  // }//

  getEventos(): Observable<any> {
    return this.http
      .get<any>(`${this.urlEndPoint}/eventos`)
      .pipe(
        catchError((e) => {
          // this.router.navigate(['/afiliaciones_trabajadores']);
          return throwError(e);
        })
      );
  }
  getIdDepartamento(municipio: string) {
    return this.http.get<any>(
      `${this.urlEndPoint}/id_departamento/${municipio}`,
      { headers: this.httpHeaders }
    );
  }

  getMotivos() {
    return this.http.get<any>(
      `${this.urlEndPoint}/motivos`,
      { headers: this.httpHeaders }
    );
  }




}
