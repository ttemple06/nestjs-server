import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as OpenApiValidator from 'express-openapi-validator';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import * as config from 'config';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { ExamModule } from './exam/exam.module';
import { Exam } from './exam/exam.model';
import { QuestionModule } from './question/question.module';
import { Question } from './question/question.model';
import { OpenApiExceptionFilter } from './filters/openapi-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.model';
import { StudentExam } from './student/student-exam.model';

const dbConfig = config.get('database') as Partial<SequelizeOptions>;
const apiSpecName = config.get('apispec.name');
const sequelize = new Sequelize(dbConfig);

// Push all relevant models here:
sequelize.addModels([Exam, Question, Student, StudentExam]);

// DO NOT DO IN PRODUCTION
if (process.env.NODE_ENV !== 'PRODUCTION') {
  (async () => {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
  })();
}

@Module({
  imports: [
    SequelizeModule.forRoot(dbConfig),
    ExamModule,
    QuestionModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: OpenApiExceptionFilter },
  ],
})
export class AppModule {
  apiSpecDocPath = join(__dirname, `./swagger/${apiSpecName}`);
  configure(consumer: MiddlewareConsumer) {
    const middlewares = OpenApiValidator.middleware({
      apiSpec: this.apiSpecDocPath,
      ...config.get('apispec.settings'),
    });
    consumer.apply(...middlewares).forRoutes('*');
  }
}
