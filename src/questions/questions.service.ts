import { Injectable, NotFoundException } from '@nestjs/common';
import { Question } from './question.model';

@Injectable()
export class QuestionsService {
  private questions: Question[] = [];

  insertQuestion(question: string): string {
    const qID = Math.random().toString();
    const newQuestion = new Question(qID, question);
    this.questions.push(newQuestion);
    return qID;
  }

  getQuestions(): Question[] {
    return [...this.questions];
  }

  getSingleQuestion(id: string) {
    const questionIndex = this.getQuestionIndex(id);
    return { ...this.questions[questionIndex] };
  }

  private getQuestionIndex(id: string) {
    const question = this.questions.findIndex((quest) => quest.id == id);
    if (!question) {
      throw new NotFoundException();
    }
    return question;
  }

  updateQuestion(id: string, fieldsToUpdate: Partial<Question>) {
    const questionIndex = this.getQuestionIndex(id);
    this.questions[questionIndex] = {
      ...this.questions[questionIndex],
      ...fieldsToUpdate,
    };
    return this.getSingleQuestion(id);
  }
}
