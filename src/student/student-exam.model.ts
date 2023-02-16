import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Exam } from '../exam/exam.model';
import { Student } from './student.model';

@Table
export class StudentExam extends Model {
  @ForeignKey(() => Student)
  @Column
  studentId: number;

  @ForeignKey(() => Exam)
  @Column
  examId: number;
}
