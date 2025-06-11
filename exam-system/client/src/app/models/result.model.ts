export interface Answer {
  questionId: string;
  selectedOptionIndex: number;
}

export interface ResultSubmit {
  studentId: string;
  examId: string;
  answers: Answer[];
}

export interface ResultResponse {
  score: number;
  total: number;
}
