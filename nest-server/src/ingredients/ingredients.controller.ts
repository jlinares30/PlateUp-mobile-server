import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';

@Controller('api/ingredients')
@UseGuards(AuthGuard('jwt'))
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  async getAll(
    @Request() req: { user: { id: string } },
    @Query('query') query?: string,
  ) {
    return this.ingredientsService.findAll(req.user.id, query);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.ingredientsService.findById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req: { user: { id: string } },
    @Body() createIngredientDto: CreateIngredientDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.ingredientsService.create(req.user.id, createIngredientDto, file?.path);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.ingredientsService.update(id, updateIngredientDto, file?.path);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ingredientsService.remove(id);
  }
}
