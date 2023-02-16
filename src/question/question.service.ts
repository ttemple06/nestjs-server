import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QuestionDTO } from './question.dto';
import { Question } from './question.model';
import { ExamService } from '../exam/exam.service';
import { convertToQuestionDTO } from './question.util';
import { Exam } from '../exam/exam.model';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question) private questionModel: typeof Question,
    @InjectModel(Exam) private examtModel: typeof Exam,
    private readonly examService: ExamService,
  ) {}
  async create(body): Promise<QuestionDTO> {
    const { examId } = body;
    const exam = await this.examtModel.findOne({
      where: { id: examId },
      include: [Question],
    });

    if (!exam) throw new UnprocessableEntityException('Exam not found');

    const question: Question = await this.questionModel.create(body);
    await this.examService.saveExamQuestions(exam, question);

    return convertToQuestionDTO(question);
  }

  async getOne(id): Promise<QuestionDTO> {
    const question: Question = await this.questionModel.findOne({
      where: { id },
    });

    if (!question) throw new UnprocessableEntityException('Question not found');

    return convertToQuestionDTO(question);
  }

  async getAll(): Promise<QuestionDTO[]> {
    const questions: Question[] = await this.questionModel.findAll();
    return Promise.all(
      questions.map(async (question) => await convertToQuestionDTO(question)),
    );
  }

  async update(id, body): Promise<QuestionDTO> {
    const question: Question = await this.questionModel.findOne({
      where: { id: id },
    });

    if (!question) throw new UnprocessableEntityException('Question not found');

    question.update(body, { updatedAt: new Date().toISOString() });
    return convertToQuestionDTO(question);
  }

  async delete(id): Promise<void> {
    const question: Question = await this.questionModel.findOne({
      where: { id: id },
    });

    if (!question) throw new UnprocessableEntityException('Question not found');

    await question.destroy();
  }
}
