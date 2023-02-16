import { NewQuestionDTO, QuestionDTO } from 'src/question/question.dto';
import { NewExamDTO, ExamDTO } from 'src/exam/exam.dto';
import * as SequelizeMock from 'sequelize-mock';
import { Exam } from 'src/exam/exam.model';
import { Question } from 'src/question/question.model';
import { Student } from 'src/student/student.model';
import { NewStudentDTO, StudentDTO } from 'src/student/student.dto';

const dbMock = new SequelizeMock();

export const mockQuestionDTO: QuestionDTO = {
  id: 1,
  title: 'Question Title',
  description: 'Question Description',
  createdAt: '2023-02-18T19:41:31.849Z',
  updatedAt: '2023-02-18T19:41:31.849Z',
};

export const mockExamDTO: ExamDTO = {
  id: 1,
  title: 'Exam Title',
  createdAt: '2023-02-18T19:41:31.849Z',
  updatedAt: '2023-02-18T19:41:31.849Z',
  questions: [],
};

export const mockStudentDTO: StudentDTO = {
  id: 1,
  firstName: 'Student First Name',
  lastName: 'Student Last Name',
  exams: [
    {
      id: 1,
      title: 'Exam Title',
      createdAt: '2023-02-18T19:41:31.849Z',
      updatedAt: '2023-02-18T19:41:31.849Z',
    },
  ],
  createdAt: '2023-02-18T19:41:31.849Z',
  updatedAt: '2023-02-18T19:41:31.849Z',
};

export const mockNewStudentDTO: NewStudentDTO = {
  firstName: 'Student First Name',
  lastName: 'Student Last Name',
};

export const mockNewQuestionDTO: NewQuestionDTO = {
  title: mockQuestionDTO.title,
  description: mockQuestionDTO.description,
  examId: mockExamDTO.id,
};

export const mockNewExamDTO: NewExamDTO = {
  title: 'Exam Title',
};

export const mockExam: Exam = dbMock
  .define('Exam', {
    id: 1,
    title: 'Exam Title',
    questions: [],
    createdAt: {
      toISOString: () => '2023-02-18T19:41:31.849Z',
    },
    updatedAt: {
      toISOString: () => '2023-02-18T19:41:31.849Z',
    },
  })
  .build();

export const mockStudent: Student = dbMock
  .define('Student', {
    id: 1,
    firstName: 'Student First Name',
    lastName: 'Student Last Name',
    exams: [mockExam],
    createdAt: {
      toISOString: () => '2023-02-18T19:41:31.849Z',
    },
    updatedAt: {
      toISOString: () => '2023-02-18T19:41:31.849Z',
    },
  })
  .build();

export const mockQuestion: Question = dbMock
  .define('Question', {
    id: 1,
    title: 'Question Title',
    description: 'Question Description',
    examId: 1,
    createdAt: {
      toISOString: () => '2023-02-18T19:41:31.849Z',
    },
    updatedAt: {
      toISOString: () => '2023-02-18T19:41:31.849Z',
    },
  })
  .build();
