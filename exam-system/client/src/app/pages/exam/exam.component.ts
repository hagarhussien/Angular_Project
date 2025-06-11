import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { Question } from '../../models/question.model';
import { Exam } from '../../models/exam.model';
import { ResultService } from '../../services/result.service';
import { ResultSubmit } from '../../models/result.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  examId!: string;
  exam!: Exam;
  questions: Question[] = [];
  currentQuestionIndex = 0;
  selectedAnswers: number[] = [];
  timeLeft!: number;
  timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private resultService: ResultService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id')!;
    this.examService.getExamById(this.examId).subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        console.log('🔍 Exam Response:', JSON.stringify(response, null, 2));

        this.exam = response.exam;
        this.questions = this.exam.questions || [];
        console.log('Questions:', this.questions);
        if (this.questions.length > 0) {
          this.selectedAnswers = new Array(this.questions.length).fill(-1);
          this.timeLeft = this.exam.duration * 60;
          this.startTimer();
        } else {
          console.warn('No questions available for this exam');
        }
      },
      error: (err) => {
        console.error('Error fetching exam:', err);
      },
    });
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.submitExam();
      }
    }, 1000);
  }

  selectAnswer(optionIndex: number): void {
    this.selectedAnswers[this.currentQuestionIndex] = optionIndex;
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  submitExam(): void {
    clearInterval(this.timerInterval);
    const answers = this.questions.map((q, i) => ({
      questionId: q._id,
      selectedOptionIndex: this.selectedAnswers[i],
    }));

    const result: ResultSubmit = {
      studentId: '665a14...', 
      examId: this.examId,
      answers,
    };

    this.resultService.submitResult(result).subscribe((res) => {
      alert(`Exam submitted successfully. Your score: ${res.score} out of ${res.total}`);
      this.router.navigate(['/']);
    });
  }

  formatTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}