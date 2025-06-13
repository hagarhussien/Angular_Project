import { Component, inject } from '@angular/core';
import { ExamService } from '../../exams/exam.service';
import { ResultService } from '../../services/result.service';
import { Exam } from '../../models/exam.model';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule
  ]
})
export class DashboardComponent {
  exams: Exam[] = [];
  results: any[] = [];

  private examService = inject(ExamService);
  private resultService = inject(ResultService);

  ngOnInit() {
    this.examService.getExams().subscribe(data => {
      this.exams = data;
    });

    const studentId = 'student1'; // Replace with real ID after auth
    this.resultService.getStudentResults(studentId).subscribe(data => {
      this.results = data;
    });
  }

  startExam(examId: string) {
    inject(Router).navigate(['/exam', examId]);
  }
}