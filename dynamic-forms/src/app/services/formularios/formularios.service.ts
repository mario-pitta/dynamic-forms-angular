import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Formulario } from 'src/app/core/Models/Formulario';
import { environment } from 'src/environments/environment';


const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class FormulariosService {
  
  
  constructor(private http: HttpClient) { }
  
  getFormById(id: number) {
    console.log('front id', id)
    return this.http.get<any>(apiUrl + '/formularios/' + id).pipe(take(1))
  }
  getForms() {
    return this.http.get<any[]>(`${apiUrl}/formularios`).pipe(take(1))
  }
  createForm(form: Formulario) {
    return this.http.post(`${apiUrl}/formularios`, form).pipe(take(1))
  }
  updateForm(form: Formulario) {
    return this.http.put(`${apiUrl}/formularios/${form.id}`, form).pipe(take(1))
  }
  deleteForm(form: Formulario) {
    return this.http.delete<any[]>(`${apiUrl}/formularios/${form.id}`).pipe(take(1))
  }
}
