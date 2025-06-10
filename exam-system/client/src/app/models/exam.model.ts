import { Question } from './question.model';

export interface Exam {
  _id: string;
  title: string;
  duration: number;
  questions: Question[];
}

// export interface ExamResponse {
//   exam: Exam;
// }