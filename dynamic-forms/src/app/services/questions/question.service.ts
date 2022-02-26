import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators'




const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  
  constructor(private http: HttpClient) { }
  
  getQuestionById(id: number){    
    return this.http.get<any>(`${apiUrl}/questions/${id}`).pipe(take(1))
  }
  getQuestions(){
    return this.http.get<any[]>(`${apiUrl}/questions`).pipe(take(1))
  }
  update(value: any) {
    return this.http.put<any[]>(`${apiUrl}/questions`, value).pipe(take(1))
  }
  create(value: any) {
    return this.http.post<any[]>(`${apiUrl}/questions`, value).pipe(take(1))
  }
  delete(value: any) {
    return this.http.delete<any[]>(`${apiUrl}/questions/${value.id}`).pipe(take(1))
  }

}
