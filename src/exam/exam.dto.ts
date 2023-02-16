import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { QuestionDTO } from '../question/question.dto';
import { StudentDTO } from '../student/student.dto';

export class ExamDTO {
  id: number;

  title: string;

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;

  @ApiPropertyOptional()
  questions?: QuestionDTO[];

  @ApiPropertyOptional()
  students?: StudentDTO[];
}

export class NewExamDTO extends OmitType(ExamDTO, ['id']) {}
