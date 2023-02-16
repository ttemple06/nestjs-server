import { QuestionDTO } from './question.dto';
import { Question } from './question.model';

export async function convertToQuestionDTO(
  question: Question,
): Promise<QuestionDTO> {
  const { createdAt, updatedAt } = question;

  const questionDTO: QuestionDTO = {
    ...question.dataValues,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };

  return questionDTO;
}
