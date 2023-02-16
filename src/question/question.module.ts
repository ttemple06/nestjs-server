import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExamModule } from '../exam/exam.module';
import { QuestionController } from './question.controller';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Module({
  imports: [SequelizeModule.forFeature([Question]), ExamModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [SequelizeModule],
})
export class QuestionModule {}
