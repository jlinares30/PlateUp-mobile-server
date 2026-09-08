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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, getSchemaPath } from '@nestjs/swagger';
import { ShoppingListService } from './shopping-list.service';
import { AddToShoppingListItemDto, UpdateShoppingListItemDto } from './dto/shopping-list.dto';

@ApiTags('Shopping List')
@ApiBearerAuth('JWT-auth')
@Controller('api/shopping-list')
@UseGuards(AuthGuard('jwt'))
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener la lista de compras del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de compras obtenida' })
  async getShoppingList(@Request() req: { user: { id: string } }) {
    return this.shoppingListService.getShoppingList(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Añadir uno o múltiples ítems a la lista de compras' })
  @ApiBody({
    description: 'Ítem o array de ítems para agregar a la lista',
    type: AddToShoppingListItemDto,
  })
  @ApiResponse({ status: 201, description: 'Ítems agregados a la lista' })
  async addToShoppingList(
    @Request() req: { user: { id: string } },
    @Body() body: AddToShoppingListItemDto | AddToShoppingListItemDto[],
  ) {
    return this.shoppingListService.addToShoppingList(req.user.id, body);
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Vaciar toda la lista de compras del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de compras vaciada' })
  async clearShoppingList(@Request() req: { user: { id: string } }) {
    return this.shoppingListService.clearShoppingList(req.user.id);
  }

  @Put(':itemId')
  @ApiOperation({ summary: 'Actualizar cantidad, unidad o estado marcado/desmarcado de un ítem' })
  @ApiParam({ name: 'itemId', description: 'ID del ítem en la lista de compras' })
  @ApiResponse({ status: 200, description: 'Ítem actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ítem no encontrado' })
  async updateShoppingListItem(
    @Request() req: { user: { id: string } },
    @Param('itemId') itemId: string,
    @Body() dto: UpdateShoppingListItemDto,
  ) {
    return this.shoppingListService.updateShoppingListItem(
      req.user.id,
      itemId,
      dto,
    );
  }

  @Delete(':itemId')
  @ApiOperation({ summary: 'Eliminar un ítem específico de la lista de compras' })
  @ApiParam({ name: 'itemId', description: 'ID del ítem en la lista de compras' })
  @ApiResponse({ status: 200, description: 'Ítem eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ítem no encontrado' })
  async removeFromShoppingList(
    @Request() req: { user: { id: string } },
    @Param('itemId') itemId: string,
  ) {
    return this.shoppingListService.removeFromShoppingList(req.user.id, itemId);
  }
}
