import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from '../question/question.model';
import { ExamDTO } from './exam.dto';
import { Exam } from './exam.model';
import { convertToExamDTO } from './exam.util';

@Injectable()
export class ExamService {
  constructor(@InjectModel(Exam) private examModel: typeof Exam) {}

  async saveExamQuestions(exam: Exam, question: Question): Promise<void> {
    // save questions to the exam, including new one:
    exam.questions = [question, ...exam.questions];
    exam.save();
  }

  async create(body): Promise<ExamDTO> {
    const exam: Exam = await this.examModel.create(body);

    return convertToExamDTO(exam);
  }

  async getOne(id): Promise<ExamDTO> {
    const exam: Exam = await this.examModel.findOne({
      where: { id },
      include: [Question],
    });

    if (!exam) throw new UnprocessableEntityException('Exam not found');

    return convertToExamDTO(exam);
  }

  async getAll(): Promise<ExamDTO[]> {
    const exams: Exam[] = await this.examModel.findAll();
    return Promise.all(exams.map(async (exam) => await convertToExamDTO(exam)));
  }

  async update(id, body): Promise<ExamDTO> {
    const exam: Exam = await this.examModel.findOne({
      where: { id: id },
    });

    if (!exam) throw new UnprocessableEntityException('Exam not found');

    exam.update(body, { updatedAt: new Date().toISOString() });
    return convertToExamDTO(exam);
  }

  async delete(id): Promise<void> {
    const exam: Exam = await this.examModel.findOne({
      where: { id: id },
    });

    if (!exam) throw new UnprocessableEntityException('Exam not found');

    await exam.destroy();
  }
}
