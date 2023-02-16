import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExamDTO, NewExamDTO } from './exam.dto';
import { ExamService } from './exam.service';

@Controller('exams')
@ApiTags('Exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @ApiOperation({
    summary: 'create exam',
    description: 'create exam',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ExamDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Error: Bad Request',
    type: Object,
  })
  @ApiResponse({
    status: 401,
    description: 'Error: Unauthorized',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Error: Not Found',
    type: Object,
  })
  @ApiResponse({
    status: 422,
    description: 'Error: Unprocessable',
    type: Object,
  })
  @Post('/')
  async create(@Body() body: NewExamDTO): Promise<ExamDTO> {
    return this.examService.create(body);
  }

  @ApiOperation({
    summary: 'get exam by id',
    description: 'get exam by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ExamDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Error: Bad Request',
    type: Object,
  })
  @ApiResponse({
    status: 401,
    description: 'Error: Unauthorized',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Error: Not Found',
    type: Object,
  })
  @ApiResponse({
    status: 422,
    description: 'Error: Unprocessable',
    type: Object,
  })
  @Get('/:id')
  @ApiParam({ name: 'id', type: 'Number' })
  async getOne(@Param() params): Promise<ExamDTO> {
    return this.examService.getOne(params.id);
  }

  @ApiOperation({
    summary: 'get all exams',
    description: 'get all exams',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ExamDTO,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Error: Bad Request',
    type: Object,
  })
  @ApiResponse({
    status: 401,
    description: 'Error: Unauthorized',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Error: Not Found',
    type: Object,
  })
  @ApiResponse({
    status: 422,
    description: 'Error: Unprocessable',
    type: Object,
  })
  @Get('/')
  async getAll(): Promise<ExamDTO[]> {
    return this.examService.getAll();
  }

  @ApiOperation({
    summary: 'update a exam',
    description: 'update a exam',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ExamDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Error: Bad Request',
    type: Object,
  })
  @ApiResponse({
    status: 401,
    description: 'Error: Unauthorized',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Error: Not Found',
    type: Object,
  })
  @ApiResponse({
    status: 422,
    description: 'Error: Unprocessable',
    type: Object,
  })
  @Put(':id')
  @ApiParam({ name: 'id', type: 'Number' })
  async update(@Param() params, @Body() body: ExamDTO): Promise<ExamDTO> {
    return this.examService.update(params.id, body);
  }

  @ApiOperation({
    summary: 'delete a exam',
    description: 'delete a exam',
  })
  @ApiResponse({
    status: 204,
    description: 'Success',
  })
  @ApiResponse({
    status: 400,
    description: 'Error: Bad Request',
    type: Object,
  })
  @ApiResponse({
    status: 401,
    description: 'Error: Unauthorized',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Error: Not Found',
    type: Object,
  })
  @ApiResponse({
    status: 422,
    description: 'Error: Unprocessable',
    type: Object,
  })
  @HttpCode(204)
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'Number' })
  async delete(@Param() params): Promise<void> {
    await this.examService.delete(params.id);
  }
}
