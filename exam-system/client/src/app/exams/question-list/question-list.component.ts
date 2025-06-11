// question-list.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExamService } from '../exam.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class QuestionListComponent {
  examId: string;
  questions: any[] = [];
  isLoading = true;
  displayedColumns: string[] = ['text', 'options', 'points', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    public router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.examId = this.route.snapshot.paramMap.get('examId')!;
    this.loadQuestions();
  }

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('examId')!;
    this.loadQuestions();
  }

  loadQuestions() {
    this.examService.getQuestionsByExam(this.examId).subscribe({
      next: (data) => {
        this.questions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading questions:', err);
        this.snackBar.open('Failed to load questions', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  editQuestion(questionId: string) {
    this.router.navigate(['/edit-question', this.examId, questionId]);
  }

  deleteQuestion(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this question?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.examService.deleteQuestion(id).subscribe({
          next: () => {
            this.questions = this.questions.filter(q => q._id !== id);
            this.snackBar.open('Question deleted successfully', 'Close', { duration: 2000 });

            // ✅ Recalculate total points for exam
            this.examService.calculateTotalPoints(this.examId).subscribe(updatedExam => {
              console.log('Updated exam:', updatedExam);
            });
          },
          error: () => {
            this.snackBar.open('Failed to delete question', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}