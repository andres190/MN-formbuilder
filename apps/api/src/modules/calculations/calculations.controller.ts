import { Body, Controller, Post } from '@nestjs/common';
import { CalculationsService } from './calculations.service';
import { EvaluateCalculationDto } from './dto/evaluate-calculation.dto';

@Controller('calculations')
export class CalculationsController {
  constructor(private readonly calculationsService: CalculationsService) {}

  @Post('evaluate')
  evaluate(@Body() dto: EvaluateCalculationDto) {
    return this.calculationsService.evaluate(dto.expression, dto.variables);
  }
}
