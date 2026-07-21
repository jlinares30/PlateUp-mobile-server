import { IsBoolean, IsNumber, IsOptional, IsString, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class MacrosDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  protein?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  carbs?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  fat?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  fiber?: number;
}

export class CreateIngredientDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  calories?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  macros?: MacrosDto;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [value];
      }
    }
    return value;
  })
  @IsArray()
  tags?: string[];

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isSystem?: boolean;
}

export class UpdateIngredientDto extends CreateIngredientDto {}
