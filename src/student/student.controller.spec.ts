import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { mockNewStudentDTO, mockStudentDTO } from '../../test/tests-helper';
import { StudentService } from './student.service';
import { getModelToken } from '@nestjs/sequelize';
import { Student } from './student.model';
import * as SequelizeMock from 'sequelize-mock';
import * as studentUtil from './student.util';
import { StudentExam } from './student-exam.model';

const DBConnectionMock = new SequelizeMock();
const StudentsMock = DBConnectionMock.define('Students', mockStudentDTO, {});

describe('StudentController', () => {
  let controller: StudentController;

  const mockService = {
    create() {
      return StudentsMock.create();
    },
    findOne() {
      return StudentsMock.findOne();
    },
    findAll() {
      return StudentsMock.findAll();
    },
    delete() {
      return StudentsMock.delete();
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        StudentService,
        {
          provide: getModelToken(Student),
          useValue: mockService,
        },
        StudentService,
        {
          provide: getModelToken(StudentExam),
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create student', async () => {
    const spyUtil = jest
      .spyOn(studentUtil, 'convertToStudentDTO')
      .mockResolvedValueOnce(mockStudentDTO);
    const student = await controller.create(mockNewStudentDTO);
    expect(student).toMatchInlineSnapshot(`
      {
        "createdAt": "2023-02-18T19:41:31.849Z",
        "exams": [
          {
            "createdAt": "2023-02-18T19:41:31.849Z",
            "id": 1,
            "title": "Exam Title",
            "updatedAt": "2023-02-18T19:41:31.849Z",
          },
        ],
        "firstName": "Student First Name",
        "id": 1,
        "lastName": "Student Last Name",
        "updatedAt": "2023-02-18T19:41:31.849Z",
      }
    `);
    expect(spyUtil).toHaveBeenCalledTimes(1);
  });

  it('should get student by id', async () => {
    const spyUtil = jest
      .spyOn(studentUtil, 'convertToStudentDTO')
      .mockResolvedValueOnce(mockStudentDTO);
    const student = await controller.getOne(mockStudentDTO.id);
    expect(student).toMatchInlineSnapshot(`
      {
        "createdAt": "2023-02-18T19:41:31.849Z",
        "exams": [
          {
            "createdAt": "2023-02-18T19:41:31.849Z",
            "id": 1,
            "title": "Exam Title",
            "updatedAt": "2023-02-18T19:41:31.849Z",
          },
        ],
        "firstName": "Student First Name",
        "id": 1,
        "lastName": "Student Last Name",
        "updatedAt": "2023-02-18T19:41:31.849Z",
      }
    `);
    expect(spyUtil).toHaveBeenCalledTimes(1);
  });

  it('should throw if student is not found when getting a student', async () => {
    jest.spyOn(StudentsMock, 'findOne').mockResolvedValue(undefined);
    await expect(controller.getOne(mockStudentDTO.id)).rejects.toThrow(
      'Student not found',
    );
  });

  it('should get all students', async () => {
    const spyUtil = jest
      .spyOn(studentUtil, 'convertToStudentDTO')
      .mockResolvedValueOnce(mockStudentDTO);
    const students = await controller.getAll();
    expect(students).toMatchInlineSnapshot(`
      [
        {
          "createdAt": "2023-02-18T19:41:31.849Z",
          "exams": [
            {
              "createdAt": "2023-02-18T19:41:31.849Z",
              "id": 1,
              "title": "Exam Title",
              "updatedAt": "2023-02-18T19:41:31.849Z",
            },
          ],
          "firstName": "Student First Name",
          "id": 1,
          "lastName": "Student Last Name",
          "updatedAt": "2023-02-18T19:41:31.849Z",
        },
      ]
    `);
    expect(spyUtil).toHaveBeenCalledTimes(1);
  });

  it('should throw if students are not found', async () => {
    jest.spyOn(StudentsMock, 'findAll').mockResolvedValue(undefined);
    await expect(controller.getAll()).rejects.toThrow('Students not found');
  });

  it('should update student by id', async () => {
    const spyUtil = jest
      .spyOn(studentUtil, 'convertToStudentDTO')
      .mockResolvedValueOnce(mockStudentDTO);
    const student = await controller.update(mockStudentDTO.id, mockStudentDTO);
    expect(student).toMatchInlineSnapshot(`
      {
        "createdAt": "2023-02-18T19:41:31.849Z",
        "exams": [
          {
            "createdAt": "2023-02-18T19:41:31.849Z",
            "id": 1,
            "title": "Exam Title",
            "updatedAt": "2023-02-18T19:41:31.849Z",
          },
        ],
        "firstName": "Student First Name",
        "id": 1,
        "lastName": "Student Last Name",
        "updatedAt": "2023-02-18T19:41:31.849Z",
      }
    `);
    expect(spyUtil).toHaveBeenCalledTimes(1);
  });

  it('should throw if student is not found when updating a student', async () => {
    jest.spyOn(StudentsMock, 'findOne').mockResolvedValue(undefined);
    await expect(
      controller.update(mockStudentDTO.id, mockStudentDTO),
    ).rejects.toThrow('Student not found');
  });

  it('should delete student by id', async () => {
    await expect(controller.delete(mockStudentDTO.id)).resolves.not.toThrow();
  });

  it('should throw if student is not found when deleting a student', async () => {
    jest.spyOn(StudentsMock, 'findOne').mockResolvedValue(undefined);
    await expect(controller.delete(mockStudentDTO.id)).rejects.toThrow(
      'Student not found',
    );
  });
});
