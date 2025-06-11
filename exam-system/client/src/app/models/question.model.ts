export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  _id: string;
  text: string;
  options: Option[];
}
