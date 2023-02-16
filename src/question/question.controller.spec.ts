import { Test, TestingModule } from '@nestjs/testing';
import {
  mockNewQuestionDTO,
  mockQuestionDTO,
  mockExamDTO,
} from '../../test/tests-helper';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { getModelToken } from '@nestjs/sequelize';
import { Question } from './question.model';
import * as SequelizeMock from 'sequelize-mock';
import { ExamService } from '../exam/exam.service';
import { Exam } from '../exam/exam.model';
import * as questionUtil from './question.util';

const DBConnectionMock = new SequelizeMock();
const QuestionsMock = DBConnectionMock.define('Questions', mockQuestionDTO, {});
const ExamsMock = DBConnectionMock.define('Exams', mockExamDTO, {});

describe('QuestionController', () => {
  let controller: QuestionController;

  const mockService = {
    create() {
      return QuestionsMock.create();
    },
    findOne() {
      return QuestionsMock.findOne();
    },
    update() {
      return QuestionsMock.update();
    },
    delete() {
      return QuestionsMock.delete();
    },
    findAll() {
      return QuestionsMock.findAll();
    },
  };

  const mockExamService = {
    findOne() {
      return ExamsMock.findOne();
    },
    saveExamQuestions() {
      return this.findOne();
    },
    save() {
      return jest.fn();
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        QuestionService,
        {
          provide: getModelToken(Question),
          useValue: mockService,
        },
        ExamService,
        {
          provide: getModelToken(Exam),
          useValue: mockExamService,
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create question', async () => {
    const spyUtil = jest
      .spyOn(questionUtil, 'convertToQuestionDTO')
      .mockResolvedValueOnce(mockQuestionDTO);
    const question = await controller.create(mockNewQuestionDTO);
    expect(question).toMatchInlineSnapshot(`
      {
        "createdAt": "2023-02-18T19:41:31.849Z",
        "description": "Question Description",
        "id": 1,
        "title": "Question Title",
        "updatedAt": "2023-02-18T19:41:31.849Z",
      }
    `);
    expect(spyUtil).toHaveBeenCalledTimes(1);
  });

  it('should throw if exam is not found when creating a question', async () => {
    jest.spyOn(ExamsMock, 'findOne').mockResolvedValue(undefined);
    await expect(controller.create(mockNewQuestionDTO)).rejects.toThrow(
      'Exam not found',
    );
  });

  it('should get question by id', async () => {
    const spyUtil = jest
      .spyOn(questionUtil, 'convertToQuestionDTO')
      .mockResolvedValueOnce(mockQuestionDTO);
    const question = await controller.getOne(mockQuestionDTO.id);
    expect(question).toMatchInlineSnapshot(`
      {
        "createdAt": "2023-02-18T19:41:31.849Z",
        "description": "Question Description",
        "id": 1,
        "title": "Question Title",
        "updatedAt": "2023-02-18T19:41:31.849Z",
      }
    `);
    expect(spyUtil).toHaveBeenCalledTimes(1);
  });

  it('should throw if question is not found when getting a question', async () => {
    jest.spyOn(QuestionsMock, 'findOne').mockResolvedValue(undefined);
    await expect(controller.getOne(mockQuestionDTO.id)).rejects.toThrow(
      'Question not found',
    );
  });

  it('should getAll questions', async () => {
    const spyUtil = jest
      .spyOn(questionUtil, 'convertToQuestionDTO')
      .mockResolvedValueOnce(mockQuestionDTO);
    const questions = await controller.getAll();
    expect(questions).toMatchInlineSnapshot(`
      [
        {
          "createdAt": "2023-02-18T19:41:31.849Z",
          "description": "Question Description",
          "id": 1,
          "title": "Question Title",
          "updatedAt": "2023-02-18T19:41:31.849Z",
        },
      ]
    `);
    expect(spyUtil).toHaveBeenCalledTimes(1);
  });

  it('should update question by id', async () => {
    const spyUtil = jest
      .spyOn(questionUtil, 'convertToQuestionDTO')
      .mockResolvedValueOnce(mockQuestionDTO);
    const question = await controller.update(
      mockQuestionDTO.id,
      mockQuestionDTO,
    );
    expect(question).toMatchInlineSnapshot(`
      {
        "createdAt": "2023-02-18T19:41:31.849Z",
        "description": "Question Description",
        "id": 1,
        "title": "Question Title",
        "updatedAt": "2023-02-18T19:41:31.849Z",
      }
    `);
    expect(spyUtil).toHaveBeenCalledTimes(1);
  });

  it('should throw if question is not found when updating a question', async () => {
    jest.spyOn(QuestionsMock, 'findOne').mockResolvedValue(undefined);
    await expect(
      controller.update(mockQuestionDTO.id, mockQuestionDTO),
    ).rejects.toThrow('Question not found');
  });

  it('should delete question by id', async () => {
    await expect(controller.delete(mockQuestionDTO.id)).resolves.not.toThrow();
  });

  it('should throw if question is not found when deleting a question', async () => {
    jest.spyOn(QuestionsMock, 'findOne').mockResolvedValue(undefined);
    await expect(controller.delete(mockQuestionDTO.id)).rejects.toThrow(
      'Question not found',
    );
  });
});
