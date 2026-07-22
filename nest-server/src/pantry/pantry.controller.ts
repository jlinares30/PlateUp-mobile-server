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
import { PantryService } from './pantry.service';
import { AddToPantryDto, UpdatePantryItemDto } from './dto/pantry.dto';

@Controller('api/pantry')
@UseGuards(AuthGuard('jwt'))
export class PantryController {
  constructor(private readonly pantryService: PantryService) {}

  @Get()
  async getPantry(@Request() req: { user: { id: string } }) {
    return this.pantryService.getPantry(req.user.id);
  }

  @Post()
  async addToPantry(
    @Request() req: { user: { id: string } },
    @Body() dto: AddToPantryDto,
  ) {
    return this.pantryService.addToPantry(req.user.id, dto);
  }

  @Put(':itemId')
  async updatePantryItem(
    @Request() req: { user: { id: string } },
    @Param('itemId') itemId: string,
    @Body() dto: UpdatePantryItemDto,
  ) {
    return this.pantryService.updatePantryItem(req.user.id, itemId, dto);
  }

  @Delete(':itemId')
  async removeFromPantry(
    @Request() req: { user: { id: string } },
    @Param('itemId') itemId: string,
  ) {
    return this.pantryService.removeFromPantry(req.user.id, itemId);
  }
}
