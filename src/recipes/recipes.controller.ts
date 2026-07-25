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
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto, GetRecipesByIngredientsDto } from './dto/recipe.dto';

@Controller('api/recipes')
@UseGuards(AuthGuard('jwt'))
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getAll(
    @Query('query') query?: string,
    @Query('category') category?: string,
    @Query('tag') tag?: string,
  ) {
    return this.recipesService.findAll(query, category, tag);
  }

  @Get('my')
  async getMy(@Request() req: { user: { id: string } }) {
    return this.recipesService.findMyRecipes(req.user.id);
  }

  @Get('favorites/all')
  async getFavorites(@Request() req: { user: { id: string } }) {
    return this.recipesService.getFavorites(req.user.id);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.recipesService.findById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req: { user: { id: string } },
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.recipesService.create(req.user.id, createRecipeDto, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.recipesService.update(req.user.id, id, updateRecipeDto, file);
  }

  @Delete(':id')
  async remove(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
  ) {
    return this.recipesService.remove(req.user.id, id);
  }

  @Post('by-ingredients')
  async getByIngredients(
    @Request() req: { user: { id: string } },
    @Body() dto: GetRecipesByIngredientsDto,
  ) {
    return this.recipesService.findByIngredients(req.user.id, dto.ingredientIds);
  }

  @Post(':id/favorite')
  async toggleFavorite(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
  ) {
    return this.recipesService.toggleFavorite(req.user.id, id);
  }
}
