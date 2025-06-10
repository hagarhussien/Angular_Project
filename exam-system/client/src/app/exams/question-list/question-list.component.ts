import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExamService } from '../exam.service';
import { NgIf, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  // styleUrls: ['./question-list.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ]
})
export class QuestionListComponent {
  examId!: string;
  questions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) {
    this.examId = this.route.snapshot.paramMap.get('examId')!;
    this.loadQuestions();
  }

  loadQuestions() {
    this.examService.getQuestionsByExam(this.examId).subscribe(data => {
      this.questions = data;
    });
  }
}