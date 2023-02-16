import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';

export class QuestionDTO {
  id: number;
  title: string;
  description: string;

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;
}

export class NewQuestionDTO extends OmitType(QuestionDTO, ['id']) {
  examId: number;
}
