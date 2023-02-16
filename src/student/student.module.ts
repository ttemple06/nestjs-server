import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentExam } from './student-exam.model';
import { StudentController } from './student.controller';
import { Student } from './student.model';
import { StudentService } from './student.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Student]),
    SequelizeModule.forFeature([StudentExam]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [SequelizeModule, StudentService],
})
export class StudentModule {}
