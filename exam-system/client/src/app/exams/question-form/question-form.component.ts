import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../exam.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    CommonModule
  ]
})
export class QuestionFormComponent {
  examId!: string;
  question: any = { options: ['', '', ''] };

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    public router: Router
  ) {
    this.examId = this.route.snapshot.paramMap.get('examId')!;
  }

  addOption() {
    this.question.options.push('');
  }

  removeOption(index: number) {
    if (this.question.options.length > 2) {
      this.question.options.splice(index, 1);
    }
  }

  submit() {
    this.examService.addQuestion(this.examId, this.question)
      .subscribe(() => {
        alert('Question added successfully!');
        this.router.navigate(['/questions', this.examId]);
      });
  }
}