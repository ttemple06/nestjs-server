import * as studentUtil from './student.util';
import { mockStudent, mockStudentDTO } from '../../test/tests-helper';

describe('Student Utils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(studentUtil).toBeDefined();
  });

  it('should convertToStudentDTO', async () => {
    const studentDTO = await studentUtil.convertToStudentDTO(mockStudent);
    expect(studentDTO).toMatchObject(mockStudentDTO);
  });
});
