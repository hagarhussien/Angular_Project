import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ExamService } from '../exam.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgIf, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgFor,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ]
})
export class ExamListComponent {
  exams = [] as any[];

  displayedColumns: string[] = ['title', 'description', 'actions'];

  constructor(private router: Router, private examService: ExamService) {}

  ngOnInit() {
    this.examService.getExams().subscribe(data => {
      this.exams = data;
    });
  }

  editExam(id: string) {
    this.router.navigate(['/exams/edit', id]);
  }

  deleteExam(id: string) {
    if (confirm('Are you sure?')) {
      this.examService.deleteExam(id).subscribe(() => {
        this.exams = this.exams.filter(e => e._id !== id);
      });
    }
  }

  viewQuestions(examId: string) {
    this.router.navigate(['/questions', examId]);
  }

  addQuestion(examId: string) {
    this.router.navigate(['/add-question', examId]);
  }
}