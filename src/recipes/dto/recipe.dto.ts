import { IsBoolean, IsNumber, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RecipeIngredientDto {
  @ApiProperty({ example: '661b6c7a1234567890abcdef', description: 'ID del ingrediente o nombre' })
  @IsString()
  ingredient: string;

  @ApiProperty({ example: 200, description: 'Cantidad del ingrediente' })
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @ApiProperty({ example: 'g', description: 'Unidad de medida (ej: g, ml, unidades)' })
  @IsString()
  unit: string;
}

export class CreateRecipeDto {
  @ApiProperty({ example: 'Pollo al Horno con Verduras', description: 'Título de la receta' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Deliciosa receta saludable para almuerzo o cena', description: 'Descripción opcional' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Almuerzo', description: 'Categoría de la receta (Desayuno, Almuerzo, Cena, Snack, etc.)' })
  @IsString()
  category: string;

  @ApiPropertyOptional({ example: 'Fácil', description: 'Nivel de dificultad (Fácil, Medio, Difícil)' })
  @IsOptional()
  @IsString()
  difficulty?: string;

  @ApiProperty({ example: '45 min', description: 'Tiempo estimado de preparación' })
  @IsString()
  time: string;

  @ApiPropertyOptional({ type: [RecipeIngredientDto], description: 'Lista de ingredientes con cantidades' })
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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientDto)
  ingredients?: RecipeIngredientDto[];

  @ApiPropertyOptional({ example: ['Precalentar el horno a 200°C', 'Sazonar el pollo', 'Hornear por 40 minutos'], description: 'Pasos de preparación' })
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
  steps?: string[];

  @ApiPropertyOptional({ example: ['saludable', 'alto en proteína', 'sin gluten'], description: 'Etiquetas o tags' })
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

  @ApiPropertyOptional({ example: true, description: 'Indica si la receta es visible públicamente' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional({ example: false, description: 'Indica si es una receta predeterminada del sistema' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isSystem?: boolean;
}

export class UpdateRecipeDto extends CreateRecipeDto {}

export class GetRecipesByIngredientsDto {
  @ApiProperty({ example: ['661b6c7a1234567890abcdef', '661b6c7a1234567890abcdeg'], description: 'IDs de ingredientes para buscar recetas compatibles' })
  @IsArray()
  @IsString({ each: true })
  ingredientIds: string[];
}
