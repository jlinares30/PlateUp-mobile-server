import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddToShoppingListItemDto {
  @ApiProperty({ example: '661b6c7a1234567890abcdef', description: 'ID del ingrediente' })
  @IsString()
  @IsNotEmpty()
  ingredientId: string;

  @ApiProperty({ example: 2, description: 'Cantidad a comprar' })
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @ApiProperty({ example: 'kg', description: 'Unidad de medida' })
  @IsString()
  unit: string;

  @ApiPropertyOptional({ example: false, description: 'Estado de si ya se compró o marcó' })
  @IsOptional()
  @IsBoolean()
  checked?: boolean;

  @ApiPropertyOptional({ example: 'Pollo al Horno', description: 'Nombre opcional de la receta de origen' })
  @IsOptional()
  @IsString()
  recipeTitle?: string;
}

export class UpdateShoppingListItemDto {
  @ApiPropertyOptional({ example: 3, description: 'Nueva cantidad' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  quantity?: number;

  @ApiPropertyOptional({ example: 'kg', description: 'Nueva unidad de medida' })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({ example: true, description: 'Marcar / desmarcar ingrediente' })
  @IsOptional()
  @IsBoolean()
  checked?: boolean;
}
