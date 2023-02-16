import {
  Column,
  Model,
  Table,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { StudentExam } from '../student/student-exam.model';
import { Student } from '../student/student.model';
import { Question } from '../question/question.model';

@Table
export class Exam extends Model {
  @Column
  title: string;

  @HasMany(() => Question)
  questions: Question[];

  @BelongsToMany(() => Student, () => StudentExam)
  students: Student[];
}
