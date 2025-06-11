import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../exams/exam.service';
import { Exam } from '../../models/exam.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  exams: Exam[] = [];

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit(): void {
    this.examService.getExams().subscribe((data) => {
      this.exams = data;
    });
  }

  startExam(examId: string): void {
    this.router.navigate(['/exam', examId]);
  }
}
