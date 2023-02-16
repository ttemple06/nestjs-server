import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Test Connectivity')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getExam(): string {
    return this.appService.getExam();
  }
}
