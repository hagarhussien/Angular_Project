import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private apiUrl = 'http://localhost:3000/api/exams';

  constructor(private http: HttpClient) {}

  getExams(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getExam(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createExam(exam: any): Observable<any> {
    return this.http.post(this.apiUrl, exam);
  }

  updateExam(id: string, exam: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, exam);
  }

  deleteExam(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addQuestion(examId: string, question: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${examId}/questions`, question);
  }

  getQuestionsByExam(examId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${examId}/questions`);
  }
}