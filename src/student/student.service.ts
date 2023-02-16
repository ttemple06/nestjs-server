import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Exam } from '../exam/exam.model';
import { StudentExam } from './student-exam.model';
import { NewStudentDTO, StudentDTO } from './student.dto';
import { Student } from './student.model';
import { convertToStudentDTO } from './student.util';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private studentModel: typeof Student,
    @InjectModel(StudentExam) private studentExamModel: typeof StudentExam,
  ) {}

  async create(body): Promise<StudentDTO> {
    const student: Student = await this.studentModel.create(body);

    if (body.exams) await this.assignExamsToStudent(student.id, body);

    return convertToStudentDTO(student);
  }

  async getOne(id): Promise<StudentDTO> {
    const student: Student = await this.studentModel.findOne({
      where: { id },
      include: [Exam],
    });

    if (!student) throw new UnprocessableEntityException('Student not found');

    return convertToStudentDTO(student);
  }

  async getAll(): Promise<StudentDTO[]> {
    const students: Student[] = await this.studentModel.findAll();

    if (!students) throw new UnprocessableEntityException('Students not found');

    return Promise.all(
      students.map(async (student) => await convertToStudentDTO(student)),
    );
  }

  async update(id, body): Promise<StudentDTO> {
    const student: Student = await this.studentModel.findOne({
      where: { id: id },
    });

    if (!student) throw new UnprocessableEntityException('Student not found');

    student.update(body, { updatedAt: new Date().toISOString() });

    if (body.exams) await this.assignExamsToStudent(student.id, body);

    return convertToStudentDTO(student);
  }

  async delete(id): Promise<void> {
    const student: Student = await this.studentModel.findOne({
      where: { id: id },
    });

    if (!student) throw new UnprocessableEntityException('Student not found');

    await student.destroy();
  }

  async assignExamsToStudent(
    studentId: number,
    body: NewStudentDTO,
  ): Promise<void> {
    const { exams } = body;

    if (!exams?.length) return;

    const studentExams = await this.studentExamModel.findAll({
      where: { studentId: studentId },
    });
    Promise.all(
      studentExams.map(async (studentExam) => {
        studentExam.destroy();
      }),
    );

    Promise.all(
      exams.map(async (exam) => {
        try {
          await this.studentExamModel.create({
            studentId,
            examId: exam.id,
          });
        } catch (err) {
          const errMsg = `Student Exam not processable`;
          // TT-TODO: create logger; fail silently
          console.log(`ERROR: ${errMsg}: ${err}`);
        }
      }),
    );
  }
}
