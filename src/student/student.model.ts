import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Exam } from '../exam/exam.model';
import { StudentExam } from './student-exam.model';

@Table
export class Student extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @BelongsToMany(() => Exam, () => StudentExam)
  exams: Exam[];
}
