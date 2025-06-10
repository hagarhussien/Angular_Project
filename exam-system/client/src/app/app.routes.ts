import { Routes } from '@angular/router';

import { ExamListComponent } from './exams/exam-list/exam-list.component';
import { ExamFormComponent } from './exams/exam-form/exam-form.component';
import { QuestionFormComponent } from './exams/question-form/question-form.component';
import { QuestionListComponent } from './exams/question-list/question-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExamComponent } from './pages/exam/exam.component';
import { ResultComponent } from './pages/result/result.component';

export const routes: Routes = [
  { path: 'exams', component: ExamListComponent },
  { path: 'exams/add', component: ExamFormComponent },
  { path: 'exams/edit/:id', component: ExamFormComponent },
  { path: 'questions/:examId', component: QuestionListComponent },
  { path: 'add-question/:examId', component: QuestionFormComponent },
  { path: '', redirectTo: '/exams', pathMatch: 'full' },
   { path: '', component: DashboardComponent },
  { path: 'exam/:id', component: ExamComponent },
  { path: 'result/:studentId', component: ResultComponent }
];

