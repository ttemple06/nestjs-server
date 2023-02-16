import { ExamDTO } from 'src/exam/exam.dto';
import { Exam } from 'src/exam/exam.model';
import { StudentDTO } from './student.dto';
import { Student } from './student.model';

export async function convertToStudentDTO(
  student: Student,
): Promise<StudentDTO> {
  const { createdAt, updatedAt, exams } = student;

  const studentExams = exams?.map((exam: Exam) => {
    const examDTO: ExamDTO = {
      ...exam.dataValues,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };

    return examDTO;
  });

  const studentDTO: StudentDTO = {
    ...student.dataValues,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    exams: studentExams,
  };

  return studentDTO;
}
