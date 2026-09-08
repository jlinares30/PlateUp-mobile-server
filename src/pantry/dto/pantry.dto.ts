import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StockLevel } from '../../users/schemas/user.schema';

export class AddToPantryDto {
  @ApiProperty({ example: '661b6c7a1234567890abcdef', description: 'ID del ingrediente' })
  @IsString()
  @IsNotEmpty()
  ingredientId: string;

  @ApiPropertyOptional({ example: 500, description: 'Cantidad disponible' })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({ example: 'g', description: 'Unidad de medida' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ enum: StockLevel, example: StockLevel.FULL, description: 'Nivel de stock (FULL, MEDIUM, LOW, OUT)' })
  @IsOptional()
  @IsEnum(StockLevel)
  stockLevel?: StockLevel;
}

export class UpdatePantryItemDto {
  @ApiPropertyOptional({ enum: StockLevel, example: StockLevel.MEDIUM, description: 'Nivel de stock actualizado' })
  @IsOptional()
  @IsEnum(StockLevel, { message: 'El nivel de stock debe ser FULL, MEDIUM, LOW o OUT' })
  stockLevel?: StockLevel;

  @ApiPropertyOptional({ example: 'kg', description: 'Unidad de medida' })
  @IsOptional()
  @IsString()
  unit?: string;
}
