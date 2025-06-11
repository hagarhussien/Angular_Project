import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl = 'http://localhost:3000/api/exams';

  constructor(private http: HttpClient) { }

  // Exam methods
  getExams(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getExam(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createExam(exam: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, exam);
  }

  updateExam(id: string, exam: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, exam);
  }

  deleteExam(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Question methods
  getQuestionsByExam(examId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${examId}/questions`);
  }

  addQuestion(examId: string, question: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${examId}/questions`, question);
  }

  deleteQuestion(questionId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/questions/${questionId}`);
  }
}