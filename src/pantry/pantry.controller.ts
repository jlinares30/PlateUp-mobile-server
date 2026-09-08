import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { PantryService } from './pantry.service';
import { AddToPantryDto, UpdatePantryItemDto } from './dto/pantry.dto';

@ApiTags('Pantry')
@ApiBearerAuth('JWT-auth')
@Controller('api/pantry')
@UseGuards(AuthGuard('jwt'))
export class PantryController {
  constructor(private readonly pantryService: PantryService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener los ingredientes y estados de la despensa del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de despensa obtenida' })
  async getPantry(@Request() req: { user: { id: string } }) {
    return this.pantryService.getPantry(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Añadir un ingrediente a la despensa' })
  @ApiResponse({ status: 201, description: 'Ingrediente añadido a la despensa' })
  async addToPantry(
    @Request() req: { user: { id: string } },
    @Body() dto: AddToPantryDto,
  ) {
    return this.pantryService.addToPantry(req.user.id, dto);
  }

  @Put(':itemId')
  @ApiOperation({ summary: 'Actualizar la cantidad o nivel de stock de un ítem de la despensa' })
  @ApiParam({ name: 'itemId', description: 'ID del ítem en la despensa' })
  @ApiResponse({ status: 200, description: 'Ítem actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ítem no encontrado' })
  async updatePantryItem(
    @Request() req: { user: { id: string } },
    @Param('itemId') itemId: string,
    @Body() dto: UpdatePantryItemDto,
  ) {
    return this.pantryService.updatePantryItem(req.user.id, itemId, dto);
  }

  @Delete(':itemId')
  @ApiOperation({ summary: 'Eliminar un ítem de la despensa' })
  @ApiParam({ name: 'itemId', description: 'ID del ítem en la despensa' })
  @ApiResponse({ status: 200, description: 'Ítem eliminado' })
  @ApiResponse({ status: 404, description: 'Ítem no encontrado' })
  async removeFromPantry(
    @Request() req: { user: { id: string } },
    @Param('itemId') itemId: string,
  ) {
    return this.pantryService.removeFromPantry(req.user.id, itemId);
  }
}
