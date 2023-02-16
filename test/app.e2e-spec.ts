import * as request from 'supertest';
import * as config from 'config';

const baseURL = config.get('app.baseUrl');

let student;
let exam;
let question;

/*********************************************
 *
 *              TEST CONNECTION
 *
 *********************************************/
describe('NestJs Sample App Test (e2e)', () => {
  it('should test GET successfully', async () => {
    const response = await request(baseURL).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Test Successful!');
  });
});

/*********************************************
 *
 *              STUDENTS
 *
 *********************************************/
describe('Students', () => {
  it('should create a student and return the body', async () => {
    const payload = {
      firstName: 'Student First Name',
      lastName: 'Student Last Name',
    };
    const response = await request(baseURL).post('/students').send(payload);
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();

    student = response.body;
  });
  it('should get student by id', async () => {
    const response = await request(baseURL).get(`/students/${student.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should get all students', async () => {
    const response = await request(baseURL).get(`/students`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should update a student', async () => {
    const payload = {
      id: student.id,
      firstName: 'New Student First Name',
      lastName: 'New Student Last Name',
    };
    const response = await request(baseURL)
      .put(`/students/${student.id}`)
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});

/*********************************************
 *
 *              EXAMS
 *
 *********************************************/
describe('Exams', () => {
  it('should create a exam and return the body', async () => {
    const payload = {
      title: 'Exam Title',
    };
    const response = await request(baseURL).post('/exams').send(payload);
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();

    exam = response.body;
  });
  it('should get exam by id', async () => {
    const response = await request(baseURL).get(`/exams/${exam.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should get all exams', async () => {
    const response = await request(baseURL).get(`/exams`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should update an exam', async () => {
    const payload = {
      id: exam.id,
      title: 'New Exam Title',
    };
    const response = await request(baseURL)
      .put(`/exams/${exam.id}`)
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});

/*********************************************
 *
 *              QUESTIONS
 *
 *********************************************/
describe('Questions', () => {
  it('should create a question and return the body', async () => {
    const payload = {
      title: 'Question Title',
      description: 'Question Description',
      examId: exam.id,
    };
    const response = await request(baseURL).post('/questions').send(payload);
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();

    question = response.body;
  });

  it('should get question by id', async () => {
    const response = await request(baseURL).get(`/questions/${question.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should get all questions', async () => {
    const response = await request(baseURL).get('/questions');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should update a question', async () => {
    const payload = {
      id: question.id,
      title: 'Question Title',
      description: 'Question Description',
    };
    const response = await request(baseURL)
      .put(`/questions/${question.id}`)
      .send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});

/*********************************************
 *
 *              DELETIONS
 *
 *********************************************/
describe('Deletions', () => {
  it('should delete student by id', async () => {
    const response = await request(baseURL).delete(`/students/${student.id}`);
    expect(response.statusCode).toBe(204);
  });

  it('should get delete question by id', async () => {
    const response = await request(baseURL).delete(`/questions/${question.id}`);
    expect(response.statusCode).toBe(204);
  });

  it('should delete exam by id', async () => {
    const response = await request(baseURL).delete(`/exams/${exam.id}`);
    expect(response.statusCode).toBe(204);
  });
});
