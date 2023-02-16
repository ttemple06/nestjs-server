import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { ExamDTO } from '../exam/exam.dto';

export class StudentDTO {
  id: number;

  firstName: string;

  lastName: string;

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;

  @ApiPropertyOptional()
  exams?: ExamDTO[];
}

export class NewStudentDTO extends OmitType(StudentDTO, ['id']) {}
