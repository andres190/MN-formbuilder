import { IsObject, IsString, Matches } from 'class-validator';

type VariableMap = Record<string, number>;

export class EvaluateCalculationDto {
  @IsString()
  @Matches(/^[0-9+\-*/().{}\s_a-zA-Z]+$/)
  expression!: string;

  @IsObject()
  variables!: VariableMap;
}
