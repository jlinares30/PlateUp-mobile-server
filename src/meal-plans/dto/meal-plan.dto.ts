import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MealType } from '../schemas/meal-plan.schema';

export class MealDto {
  @ApiProperty({ enum: MealType, example: MealType.DESAYUNO, description: 'Tipo de comida (desayuno, almuerzo, cena, snack)' })
  @IsEnum(MealType, { message: 'El tipo debe ser desayuno, almuerzo, cena o snack' })
  type: MealType;

  @ApiProperty({ example: '661b6c7a1234567890abcdef', description: 'ID de la receta asignada' })
  @IsString()
  recipe: string;
}

export class MealPlanDayDto {
  @ApiProperty({ example: 'Lunes', description: 'Nombre o identificador del día' })
  @IsString()
  day: string;

  @ApiProperty({ type: [MealDto], description: 'Comidas programadas para este día' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MealDto)
  meals: MealDto[];
}

export class CreateMealPlanDto {
  @ApiProperty({ example: 'Plan de Definición Semanal', description: 'Título del plan de comidas' })
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @ApiPropertyOptional({ example: 'Menú balanceado enfocado en alta proteína y déficit calórico', description: 'Descripción opcional' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: [MealPlanDayDto], description: 'Días y comidas del plan' })
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
  @Type(() => MealPlanDayDto)
  days?: MealPlanDayDto[];

  @ApiPropertyOptional({ example: true, description: 'Indica si es el plan activo actualmente' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Indica si el plan es visible para la comunidad' })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isPublic?: boolean;
}

export class UpdateMealPlanDto extends CreateMealPlanDto {}

export class CloneMealPlanDto {
  @ApiProperty({ example: '661b6c7a1234567890abcdef', description: 'ID del plan a clonar' })
  @IsString()
  @IsNotEmpty({ message: 'ID es requerido' })
  id: string;
}
