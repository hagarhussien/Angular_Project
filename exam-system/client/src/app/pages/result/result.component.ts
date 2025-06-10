import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultService, ResultFull } from '../../services/result.service';
import { Question } from '../../models/question.model';
import { QuestionService } from '../../services/question.service'; 
import { CommonModule } from '@angular/common';
@Component({
   standalone: true,
   imports: [CommonModule],
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {
  studentId!: string;
  results: ResultFull[] = [];
  detailedQuestions: { [questionId: string]: Question } = {};

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('studentId')!;
    this.resultService.getStudentResults(this.studentId).subscribe(res => {
      this.results = res;
      res.forEach(r => {
        r.answers.forEach(a => {
          this.questionService.getQuestionById(a.questionId).subscribe(q => {
            this.detailedQuestions[a.questionId] = q;
          });
        });
      });
    });
  }

  getOptionText(qId: string, index: number): string {
    return this.detailedQuestions[qId]?.options[index]?.text || '';
  }

  isCorrect(qId: string, selected: number): boolean {
    const question = this.detailedQuestions[qId];
    if (!question) return false;
    return question.options[selected]?.isCorrect === true;
  }
}
