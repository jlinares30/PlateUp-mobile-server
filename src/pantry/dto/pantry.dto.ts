import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { StockLevel } from '../../users/schemas/user.schema';

export class AddToPantryDto {
  @IsString()
  @IsNotEmpty()
  ingredientId: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsEnum(StockLevel)
  stockLevel?: StockLevel;
}

export class UpdatePantryItemDto {
  @IsOptional()
  @IsEnum(StockLevel, { message: 'El nivel de stock debe ser FULL, MEDIUM, LOW o OUT' })
  stockLevel?: StockLevel;

  @IsOptional()
  @IsString()
  unit?: string;
}
