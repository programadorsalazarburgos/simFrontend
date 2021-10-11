import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistaService } from '../../../shared/services/artista/artista.service';

@Component({
  selector: 'app-perfil-artista',
  templateUrl: './perfil-artista.component.html',
  styleUrls: ['./perfil-artista.component.css']
})
export class PerfilArtistaComponent implements OnInit {
  
  items = [];
  cars = [
    { id: 1, name: "Musica" },
    { id: 2, name: "Teatro" },
    { id: 3, name: "Danzas" },
  ];
  
  subArea = [{ id: 2, name: "Teatro" }];
  rolArtistico = [{ id: 3, name: "Danzas" }];
  registerBiografiaForm: FormGroup;
  title = 'appBootstrap';  
  closeResult: string = '';
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private artistaService:ArtistaService) { }


  modalOpen(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        biografia: ['', Validators.required],

    }, {
    });
}

traerEventos() {
  this.artistaService.getEventos().subscribe((resp) => {
   console.log(resp);
   
  });
}
get f() { return this.registerForm.controls; }

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }


  // display form values on success
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

onReset() {
  this.submitted = false;
  this.registerForm.reset();
}
}
