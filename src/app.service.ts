import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getExam(): string {
    return 'Test Successful!';
  }
}
