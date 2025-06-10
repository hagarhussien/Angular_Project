import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../exam.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ]
})
export class ExamFormComponent {
  exam: any = {};
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    public router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.examService.getExam(id).subscribe(data => {
        this.exam = data;
      });
    }
  }

  saveExam(): void {
    if (this.exam._id) {
      this.examService.updateExam(this.exam._id, this.exam)
        .subscribe(() => this.router.navigate(['/exams']));
    } else {
      this.examService.createExam(this.exam)
        .subscribe(() => this.router.navigate(['/exams']));
    }
  }
}