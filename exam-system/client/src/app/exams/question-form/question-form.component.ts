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
    options: ['', ''],
    correctAnswerIndex: 0,
    points: 1
  };
  isLoading = false;
  isEditMode = false;

  constructor(
    private route : ActivatedRoute,
    private examService : ExamService,
    public router : Router,
    private snackBar : MatSnackBar) {
    this.examId = this.route.snapshot.paramMap.get('examId')!;
    const questionId = this.route.snapshot.paramMap.get('questionId');

    if (questionId) {
      this.isEditMode = true;
      this.isLoading = true;
      this.examService.getQuestion(questionId).subscribe({
        next: data => {
          this.question = data;
          this.isLoading = false;
        },
        error: () => {
          this.snackBar.open('Failed to load question', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
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

  // submit() {
  //   // Validate form
  //   if (!this.question.text || this.question.options.some((opt: string) => !opt.trim())) {
  //     this.snackBar.open('Please fill all question fields', 'Close', { duration: 3000 });
  //     return;
  //   }

  //   this.examService.addQuestion(this.examId, this.question).subscribe({
  //     next: () => {
  //       this.snackBar.open('Question added successfully!', 'Close', { duration: 2000 });
  //       this.router.navigate(['/questions', this.examId]);
  //     },
  //     error: (err) => {
  //       console.error('Error adding question:', err);
  //       this.snackBar.open('Failed to add question', 'Close', { duration: 3000 });
  //     }
  //   });
  // }
  submit() {
    if (!this.question.text || this.question.options.some((opt: string) => !opt)) {
      this.snackBar.open('Please fill all fields', 'Close', { duration: 3000 });
      return;
    }

    const payload = {
      ...this.question,
      examId: this.examId
    };

    const operation = this.isEditMode
      ? this.examService.updateQuestion(this.question._id, payload)
      : this.examService.addQuestion(this.examId, payload);

    this.isLoading = true;
    operation.subscribe({
      next: () => {
        this.snackBar.open(`Question ${this.isEditMode ? 'updated' : 'created'}!`, 'Close', { duration: 2000 });

        // ✅ Trigger point recalculation
        this.examService.calculateTotalPoints(this.examId).subscribe(updatedExam => {
          console.log('Updated exam with new total points:', updatedExam.totalPoints);
          this.router.navigate(['/questions', this.examId]);
        });
      },
      error: () => {
        this.snackBar.open('Failed to save question', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}