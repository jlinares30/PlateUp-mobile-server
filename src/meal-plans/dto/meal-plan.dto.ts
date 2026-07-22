import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { MealType } from '../schemas/meal-plan.schema';

export class MealDto {
  @IsEnum(MealType, { message: 'El tipo debe ser desayuno, almuerzo, cena o snack' })
  type: MealType;

  @IsString()
  recipe: string;
}

export class MealPlanDayDto {
  @IsString()
  day: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MealDto)
  meals: MealDto[];
}

export class CreateMealPlanDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

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

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isPublic?: boolean;
}

export class UpdateMealPlanDto extends CreateMealPlanDto {}

export class CloneMealPlanDto {
  @IsString()
  @IsNotEmpty({ message: 'ID es requerido' })
  id: string;
}
