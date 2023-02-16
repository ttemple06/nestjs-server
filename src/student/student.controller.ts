import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewStudentDTO, StudentDTO } from './student.dto';
import { StudentService } from './student.service';

@Controller('students')
@ApiTags('Students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({
    summary: 'create student',
    description: 'create student',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: StudentDTO,
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
  async create(@Body() body: NewStudentDTO): Promise<StudentDTO> {
    return this.studentService.create(body);
  }

  @ApiOperation({
    summary: 'get student by id',
    description: 'get student by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: StudentDTO,
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
  async getOne(@Param() params): Promise<StudentDTO> {
    return this.studentService.getOne(params.id);
  }

  @ApiOperation({
    summary: 'get all students',
    description: 'get all students',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: StudentDTO,
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
  async getAll(): Promise<StudentDTO[]> {
    return this.studentService.getAll();
  }

  @ApiOperation({
    summary: 'update a student',
    description: 'update a student',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: StudentDTO,
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
    @Body() body: StudentDTO,
  ): Promise<StudentDTO> {
    return this.studentService.update(params.id, body);
  }

  @ApiOperation({
    summary: 'delete a student',
    description: 'delete a student',
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
    await this.studentService.delete(params.id);
  }
}
