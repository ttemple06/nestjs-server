import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Exam } from '../exam/exam.model';

@Table
export class Question extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => Exam)
  @Column
  examId: number;

  @BelongsTo(() => Exam)
  exam: Exam;
}
