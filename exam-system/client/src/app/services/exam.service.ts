import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam.model';

@Injectable({ providedIn: 'root' })
export class ExamService {
  private BASE_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}
  getAllExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.BASE_URL}/exams`);
  }
  getExamById(id: string): Observable<Exam> {
    return this.http.get<Exam>(`${this.BASE_URL}/exams/${id}`);
  }
}