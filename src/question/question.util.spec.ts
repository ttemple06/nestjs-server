import * as questionUtil from './question.util';
import { mockQuestion, mockQuestionDTO } from '../../test/tests-helper';

describe('Question Utils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(questionUtil).toBeDefined();
  });

  it('should convertToQuestionDTO', async () => {
    const questionDTO = await questionUtil.convertToQuestionDTO(mockQuestion);
    expect(questionDTO).toMatchObject(mockQuestionDTO);
  });
});
