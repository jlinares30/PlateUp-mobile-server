import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class AddToShoppingListItemDto {
  @IsString()
  @IsNotEmpty()
  ingredientId: string;

  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsString()
  unit: string;

  @IsOptional()
  @IsBoolean()
  checked?: boolean;

  @IsOptional()
  @IsString()
  recipeTitle?: string;
}

export class UpdateShoppingListItemDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quantity?: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsBoolean()
  checked?: boolean;
}
