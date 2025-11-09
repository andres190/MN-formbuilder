import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './types/create-form.dto';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  create(@Body() dto: CreateFormDto) {
    return this.formsService.create(dto);
  }

  @Get()
  findAll() {
    return this.formsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(id);
  }
}
