import { Routes } from '@angular/router';

import { ExamListComponent } from './exams/exam-list/exam-list.component';
import { ExamFormComponent } from './exams/exam-form/exam-form.component';
import { QuestionFormComponent } from './exams/question-form/question-form.component';
import { QuestionListComponent } from './exams/question-list/question-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExamComponent } from './pages/exam/exam.component';
import { ResultComponent } from './pages/result/result.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'exams',
    component: ExamListComponent ,
    canActivate: [authGuard],
    data: { roles: ['admin'] }
  },
  { path: 'exams/add', component: ExamFormComponent ,
    canActivate: [authGuard],
    data: { roles: ['admin'] }
  },
  { path: 'exams/edit/:id', component: ExamFormComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] }
  },
  { path: 'questions/:examId', component: QuestionListComponent ,
    canActivate: [authGuard],
    data: { roles: ['admin'] }
  },
  { path: 'edit-question/:examId/:questionId', component: QuestionFormComponent ,
    canActivate: [authGuard],
    data: { roles: ['admin'] }
  },
  { path: 'add-question/:examId', component: QuestionFormComponent ,
    canActivate: [authGuard],
    data: { roles: ['admin'] }
  },

  // { path: '', redirectTo: '/exams', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['student'] }
  },

  // { path: '', component: DashboardComponent },



  { path: 'exam/:id', component: ExamComponent ,
    canActivate: [authGuard],
    data: { roles: ['student']}
  },
  { path: 'result/:studentId', component: ResultComponent ,
    canActivate: [authGuard],
    data: { roles: ['student']}
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }

];


