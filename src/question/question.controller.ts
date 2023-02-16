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
import { NewQuestionDTO, QuestionDTO } from './question.dto';
import { QuestionService } from './question.service';

@Controller('questions')
@ApiTags('Questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({
    summary: 'create question',
    description: 'create question',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: QuestionDTO,
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
  async create(@Body() body: NewQuestionDTO): Promise<QuestionDTO> {
    return this.questionService.create(body);
  }

  @ApiOperation({
    summary: 'get question by id',
    description: 'get question by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: QuestionDTO,
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
  async getOne(@Param() params): Promise<QuestionDTO> {
    return this.questionService.getOne(params.id);
  }

  @ApiOperation({
    summary: 'get all questions',
    description: 'get all questions',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: QuestionDTO,
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
  async getAll(): Promise<QuestionDTO[]> {
    return this.questionService.getAll();
  }

  @ApiOperation({
    summary: 'update a question',
    description: 'update a question',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: QuestionDTO,
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
  async update(
    @Param() params,
    @Body() body: QuestionDTO,
  ): Promise<QuestionDTO> {
    return this.questionService.update(params.id, body);
  }

  @ApiOperation({
    summary: 'delete a question',
    description: 'delete a question',
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
    await this.questionService.delete(params.id);
  }
}
