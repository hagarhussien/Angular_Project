// question-form.component.ts
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../exam.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,

    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    NgFor

  ]
})
export class QuestionFormComponent {
  examId: string;
  question: any = {
    text: '',
    options: ['', ''], // Start with 2 empty options
    correctAnswerIndex: 0
  };
  isLoading = false;

  constructor(
    private route : ActivatedRoute,
    private examService : ExamService,
    public router : Router,
    private snackBar : MatSnackBar) {
    this.examId = this.route.snapshot.paramMap.get('examId')!;
  }

  addOption() {
    this.question.options.push('');

  }

  removeOption(index: number) {
    if (this.question.options.length > 2) {
      this.question.options.splice(index, 1);
      // Adjust correct answer index if needed
      if (this.question.correctAnswerIndex >= index) {
        this.question.correctAnswerIndex = Math.max(0, this.question.correctAnswerIndex - 1);
      }
    }
  }

  submit() {
    // Validate form
    if (!this.question.text || this.question.options.some((opt: string) => !opt.trim())) {
      this.snackBar.open('Please fill all question fields', 'Close', { duration: 3000 });
      return;
    }

    this.examService.addQuestion(this.examId, this.question).subscribe({
      next: () => {
        this.snackBar.open('Question added successfully!', 'Close', { duration: 2000 });
        this.router.navigate(['/questions', this.examId]);
      },
      error: (err) => {
        console.error('Error adding question:', err);
        this.snackBar.open('Failed to add question', 'Close', { duration: 3000 });
      }
    });
  }
}