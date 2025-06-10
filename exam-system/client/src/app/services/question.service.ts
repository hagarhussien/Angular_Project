import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model'; 

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private BASE_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getQuestionById(qId: string): Observable<Question> {
    return this.http.get<Question>(`${this.BASE_URL}/questions/${qId}`);
  }
}
