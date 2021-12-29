import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './question.model';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Post()
  addQuestion(@Body('question') question: string): any {
    const id = this.questionService.insertQuestion(question);
    return { id };
  }

  @Get()
  getAllQuestions(): Question[] {
    return this.questionService.getQuestions();
  }

  @Get(':id')
  getQuestion(@Param('id') id: string) {
    return this.questionService.getSingleQuestion(id);
  }

  @Patch(':id')
  updateQuestion(@Param('id') id: string, @Body() body: Partial<Question>) {
    return this.questionService.updateQuestion(id, body);
  }
}
