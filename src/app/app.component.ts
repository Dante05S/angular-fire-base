import { Component, OnInit } from '@angular/core';
import {PersonaModel} from './models/persona.model';
import {NgForm} from '@angular/forms';
import { PersonasService } from './services/personas.service';
import Swal from 'sweetalert2'
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  persona: PersonaModel;
  title = 'crud-firebase';
  personas: PersonaModel[] = [];
  constructor(private personaService:PersonasService)
  {
    this.persona =
    {
      id: "",
      nombre: "",
      apellido: "",
      estado: true,
    }
  }

  ngOnInit(): void {
    this.personaService.getPersonas().subscribe(resp => this.personas = resp);
  }

  guardar(form: NgForm)
  {
    if(form.invalid)
    {
        console.log("Formulario no valido");
        return;
    }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Guardando',
      showConfirmButton: false,
      timer: 1500
    })


    let peticion:Observable<any>
    if(this.persona.id)
    {
      peticion = this.personaService.actualizarPersona(this.persona);
    }
    else
    {
      peticion = this.personaService.crearPersona(this.persona);
    }
    peticion.subscribe(resp =>
      {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se actualizo correctamente la persona',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

}
