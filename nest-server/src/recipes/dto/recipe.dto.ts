import { IsBoolean, IsNumber, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class RecipeIngredientDto {
  @IsString()
  ingredient: string;

  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsString()
  unit: string;
}

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  difficulty?: string;

  @IsString()
  time: string;

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

export class UpdateRecipeDto extends CreateRecipeDto {}

export class GetRecipesByIngredientsDto {
  @IsArray()
  @IsString({ each: true })
  ingredientIds: string[];
}
