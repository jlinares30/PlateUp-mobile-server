import { IsBoolean, IsNumber, IsOptional, IsString, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MacrosDto {
  @ApiPropertyOptional({ example: 25, description: 'Gramos de proteína' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  protein?: number;

  @ApiPropertyOptional({ example: 30, description: 'Gramos de carbohidratos' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  carbs?: number;

  @ApiPropertyOptional({ example: 5, description: 'Gramos de grasa' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  fat?: number;

  @ApiPropertyOptional({ example: 4, description: 'Gramos de fibra' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  fiber?: number;
}

export class CreateIngredientDto {
  @ApiProperty({ example: 'Pechuga de Pollo', description: 'Nombre del ingrediente' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Carnes', description: 'Categoría (Carnes, Vegetales, Lácteos, etc.)' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'g', description: 'Unidad de medida estándar (g, ml, unidad)' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ example: 165, description: 'Calorías estimadas por porción/unidad' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  calories?: number;

  @ApiPropertyOptional({ type: MacrosDto, description: 'Información nutricional de macronutrientes' })
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

  @ApiPropertyOptional({ example: ['proteína', 'fresco', 'pollo'], description: 'Etiquetas o tags' })
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

  @ApiPropertyOptional({ example: true, description: 'Indica si es visible públicamente' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional({ example: false, description: 'Indica si es del catálogo base del sistema' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isSystem?: boolean;
}

export class UpdateIngredientDto extends CreateIngredientDto {}
