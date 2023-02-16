import * as examUtil from './exam.util';
import { mockExam, mockExamDTO } from '../../test/tests-helper';

describe('Exam Utils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(examUtil).toBeDefined();
  });

  it('should convertToExamDTO', async () => {
    const examDTO = await examUtil.convertToExamDTO(mockExam);
    expect(examDTO).toMatchObject(mockExamDTO);
  });
});
