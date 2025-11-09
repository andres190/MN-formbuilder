import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class BlockDefinitionDto {
  @IsString()
  id!: string;

  @IsString()
  type!: string;

  @IsOptional()
  @IsString()
  label?: string;
}

export class CreateFormDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDefinitionDto)
  blocks!: BlockDefinitionDto[];
}
