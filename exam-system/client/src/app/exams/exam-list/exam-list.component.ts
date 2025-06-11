// exam-list.component.ts
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ExamService } from '../exam.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { NgIf, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,

    CommonModule

    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule

  ]
})
export class ExamListComponent {
  private router = inject(Router);
  private examService = inject(ExamService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  exams: any[] = [];
  isLoading = true;
  displayedColumns: string[] = ['title', 'description', 'duration', 'actions'];

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    this.examService.getExams().subscribe({
      next: data => {
        this.exams = data;
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load exams', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  editExam(id: string) {
    this.router.navigate(['/exams/edit', id]);
  }

  deleteExam(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this exam?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.examService.deleteExam(id).subscribe({
          next: () => {
            this.exams = this.exams.filter(e => e._id !== id);
            this.snackBar.open('Exam deleted successfully', 'Close', { duration: 2000 });
          },
          error: () => {
            this.snackBar.open('Failed to delete exam', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  viewQuestions(examId: string) {
    this.router.navigate(['/questions', examId]);
  }

  addQuestion(examId: string) {
    this.router.navigate(['/add-question', examId]);
  }
}