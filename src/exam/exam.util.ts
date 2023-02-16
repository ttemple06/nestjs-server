import { ExamDTO } from './exam.dto';
import { Exam } from './exam.model';

export async function convertToExamDTO(exam: Exam): Promise<ExamDTO> {
  const { createdAt, updatedAt } = exam;

  const examDTO: ExamDTO = {
    ...exam.dataValues,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };

  return examDTO;
}
