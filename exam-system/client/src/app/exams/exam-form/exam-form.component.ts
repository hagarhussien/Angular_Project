// exam-form.component.ts
import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../exam.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgIf
  ]
})
export class ExamFormComponent {
  private route = inject(ActivatedRoute);
  private examService = inject(ExamService);
  public router = inject(Router);
  private snackBar = inject(MatSnackBar);

  exam: any = {};
  isEditMode = false;
  isLoading = false;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.isLoading = true;
      this.examService.getExam(id).subscribe({
        next: data => {
          this.exam = data;
          this.isLoading = false;
        },
        error: () => {
          this.snackBar.open('Failed to load exam', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  saveExam(): void {
    this.isLoading = true;
    const operation = this.isEditMode
      ? this.examService.updateExam(this.exam._id, this.exam)
      : this.examService.createExam(this.exam);

    operation.subscribe({
      next: () => {
        this.snackBar.open(`Exam ${this.isEditMode ? 'updated' : 'created'} successfully`, 'Close', { duration: 2000 });
        this.router.navigate(['/exams']);
      },
      error: () => {
        this.snackBar.open(`Failed to ${this.isEditMode ? 'update' : 'create'} exam`, 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}