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
import { ShoppingListService } from './shopping-list.service';
import { AddToShoppingListItemDto, UpdateShoppingListItemDto } from './dto/shopping-list.dto';

@Controller('api/shopping-list')
@UseGuards(AuthGuard('jwt'))
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Get()
  async getShoppingList(@Request() req: { user: { id: string } }) {
    return this.shoppingListService.getShoppingList(req.user.id);
  }

  @Post()
  async addToShoppingList(
    @Request() req: { user: { id: string } },
    @Body() body: AddToShoppingListItemDto | AddToShoppingListItemDto[],
  ) {
    return this.shoppingListService.addToShoppingList(req.user.id, body);
  }

  @Delete('clear')
  async clearShoppingList(@Request() req: { user: { id: string } }) {
    return this.shoppingListService.clearShoppingList(req.user.id);
  }

  @Put(':itemId')
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
  async removeFromShoppingList(
    @Request() req: { user: { id: string } },
    @Param('itemId') itemId: string,
  ) {
    return this.shoppingListService.removeFromShoppingList(req.user.id, itemId);
  }
}
