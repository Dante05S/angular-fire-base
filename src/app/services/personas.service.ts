import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PersonaModel} from '../models/persona.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private url:string = 'https://crud-firebase-6c0ee-default-rtdb.firebaseio.com';

  constructor(private http:HttpClient) { }

  crearPersona(persona:PersonaModel)
  {
    return this.http.post(`${this.url}/personas.json`, persona)
    .pipe(map((resp:any)=>
    {
      persona.id = resp.name;
      return persona;
    })
  )
  }

  actualizarPersona(persona:PersonaModel)
  {
    const personaTemp =
    {
      ...persona
    }

    delete personaTemp.id;

    return this.http.put(`${this.url}/personas/{persona.id}.json`,personaTemp);
  }

  getPersonas()
  {
    return this.http.get(`${this.url}/personas.json`).pipe(map(this.crearArreglo))
  }

  private crearArreglo(personasObj:Object)
  {
    const personas:PersonaModel[] = [];

    if(personasObj == null)
    {
      return [];
    }

    Object.keys(personasObj).forEach(key =>
      {
          console.log(key)

      })

    return [];

  }

}
