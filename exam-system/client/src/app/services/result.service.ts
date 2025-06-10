import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultSubmit, ResultResponse } from '../models/result.model';
import { Observable } from 'rxjs';

export interface ResultFull {
  examId: {
    _id: string;
    title: string;
  };
  score: number;
  total: number;
  answers: {
    questionId: string;
    selectedOptionIndex: number;
  }[];
  _id: string;
}

@Injectable({ providedIn: 'root' })
export class ResultService {
  private BASE_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  submitResult(data: ResultSubmit): Observable<ResultResponse> {
    return this.http.post<ResultResponse>(`${this.BASE_URL}/results/submit`, data);
  }

  getStudentResults(studentId: string): Observable<ResultFull[]> {
    return this.http.get<ResultFull[]>(`${this.BASE_URL}/results/${studentId}`);
  }
}
