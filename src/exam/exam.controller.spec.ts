import { Test, TestingModule } from '@nestjs/testing';
import { mockNewExamDTO, mockExamDTO } from '../../test/tests-helper';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { getModelToken } from '@nestjs/sequelize';
import { Exam } from './exam.model';
import * as SequelizeMock from 'sequelize-mock';
import * as examUtil from './exam.util';

const DBConnectionMock = new SequelizeMock();
const ExamsMock = DBConnectionMock.define('Exams', mockExamDTO, {});

describe('ExamController', () => {
  let controller: ExamController;

  const mockService = {
    create() {
      return ExamsMock.create();
    },
    findOne() {
      return ExamsMock.findOne();
    },
    findAll() {
      return ExamsMock.findAll();
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamController],
      providers: [
        ExamService,
        {
          provide: getModelToken(Exam),
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ExamController>(ExamController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create exam', async () => {
    const spyUtil = jest
      .spyOn(examUtil, 'convertToExamDTO')
      .mockResolvedValueOnce(mockExamDTO);
    const exam = await controller.create(mockNewExamDTO);
    expect(exam).toMatchInlineSnapshot(`
      {
        "createdAt": "2023-02-18T19:41:31.849Z",
        "id": 1,
        "questions": [],
        "title": "Exam Title",
        "updatedAt": "2023-02-18T19:41:31.849Z",
      }
    `);
    expect(spyUtil).toHaveBeenCalledTimes(1);
  });

  it('should get exam by id', async () => {
    const spyUtil = jest
      .spyOn(examUtil, 'convertToExamDTO')
      .mockResolvedValueOnce(mockExamDTO);
    const exam = await controller.getOne(mockExamDTO.id);
    expect(exam).toMatchInlineSnapshot(`
      {
        "createdAt": "2023-02-18T19:41:31.849Z",
        "id": 1,
        "questions": [],
        "title": "Exam Title",
        "updatedAt": "2023-02-18T19:41:31.849Z",
      }
    `);
    expect(spyUtil).toHaveBeenCalledTimes(1);
  });

  it('should throw if exam is not found when getting a exam', async () => {
    jest.spyOn(ExamsMock, 'findOne').mockResolvedValue(undefined);
    await expect(controller.getOne(mockExamDTO.id)).rejects.toThrow(
      'Exam not found',
    );
  });

  it('should getAll exams', async () => {
    const spyUtil = jest
      .spyOn(examUtil, 'convertToExamDTO')
      .mockResolvedValueOnce(mockExamDTO);
    const exams = await controller.getAll();
    expect(exams).toMatchInlineSnapshot(`
      [
        {
          "createdAt": "2023-02-18T19:41:31.849Z",
          "id": 1,
          "questions": [],
          "title": "Exam Title",
          "updatedAt": "2023-02-18T19:41:31.849Z",
        },
      ]
    `);
    expect(spyUtil).toHaveBeenCalledTimes(1);
  });

  it('should update exam by id', async () => {
    const spyUtil = jest
      .spyOn(examUtil, 'convertToExamDTO')
      .mockResolvedValueOnce(mockExamDTO);
    const exam = await controller.update(mockExamDTO.id, mockExamDTO);
    expect(exam).toMatchInlineSnapshot(`
      {
        "createdAt": "2023-02-18T19:41:31.849Z",
        "id": 1,
        "questions": [],
        "title": "Exam Title",
        "updatedAt": "2023-02-18T19:41:31.849Z",
      }
    `);
    expect(spyUtil).toHaveBeenCalledTimes(1);
  });

  it('should throw if exam is not found when updating a exam', async () => {
    jest.spyOn(ExamsMock, 'findOne').mockResolvedValue(undefined);
    await expect(
      controller.update(mockExamDTO.id, mockExamDTO),
    ).rejects.toThrow('Exam not found');
  });

  it('should delete exam by id', async () => {
    await expect(controller.delete(mockExamDTO.id)).resolves.not.toThrow();
  });

  it('should throw if exam is not found when deleting a exam', async () => {
    jest.spyOn(ExamsMock, 'findOne').mockResolvedValue(undefined);
    await expect(controller.delete(mockExamDTO.id)).rejects.toThrow(
      'Exam not found',
    );
  });
});
