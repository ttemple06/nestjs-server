import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExamController } from './exam.controller';
import { Exam } from './exam.model';
import { ExamService } from './exam.service';

@Module({
  imports: [SequelizeModule.forFeature([Exam])],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [SequelizeModule, ExamService],
})
export class ExamModule {}
