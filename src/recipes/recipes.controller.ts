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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiQuery, ApiParam } from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto, GetRecipesByIngredientsDto } from './dto/recipe.dto';

@ApiTags('Recipes')
@ApiBearerAuth('JWT-auth')
@Controller('api/recipes')
@UseGuards(AuthGuard('jwt'))
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las recetas públicas o del usuario con filtros' })
  @ApiQuery({ name: 'query', required: false, description: 'Búsqueda por título o descripción' })
  @ApiQuery({ name: 'category', required: false, description: 'Filtrar por categoría' })
  @ApiQuery({ name: 'tag', required: false, description: 'Filtrar por etiqueta (tag)' })
  @ApiResponse({ status: 200, description: 'Lista de recetas obtenida' })
  async getAll(
    @Query('query') query?: string,
    @Query('category') category?: string,
    @Query('tag') tag?: string,
  ) {
    return this.recipesService.findAll(query, category, tag);
  }

  @Get('my')
  @ApiOperation({ summary: 'Obtener recetas creadas por el usuario actual' })
  @ApiResponse({ status: 200, description: 'Lista de recetas del usuario' })
  async getMy(@Request() req: { user: { id: string } }) {
    return this.recipesService.findMyRecipes(req.user.id);
  }

  @Get('favorites/all')
  @ApiOperation({ summary: 'Obtener todas las recetas marcadas como favoritas' })
  @ApiResponse({ status: 200, description: 'Lista de recetas favoritas' })
  async getFavorites(@Request() req: { user: { id: string } }) {
    return this.recipesService.getFavorites(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener los detalles de una receta por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la receta en MongoDB' })
  @ApiResponse({ status: 200, description: 'Detalle de la receta encontrado' })
  @ApiResponse({ status: 404, description: 'Receta no encontrada' })
  async getById(@Param('id') id: string) {
    return this.recipesService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva receta (soporta imagen de portada)' })
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiResponse({ status: 201, description: 'Receta creada exitosamente' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req: { user: { id: string } },
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.recipesService.create(req.user.id, createRecipeDto, file);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una receta existente creada por el usuario' })
  @ApiParam({ name: 'id', description: 'ID de la receta' })
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiResponse({ status: 200, description: 'Receta actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Receta no encontrada o no pertenece al usuario' })
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
  @ApiOperation({ summary: 'Eliminar una receta' })
  @ApiParam({ name: 'id', description: 'ID de la receta' })
  @ApiResponse({ status: 200, description: 'Receta eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Receta no encontrada' })
  async remove(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
  ) {
    return this.recipesService.remove(req.user.id, id);
  }

  @Post('by-ingredients')
  @ApiOperation({ summary: 'Buscar recetas que coincidan con los ingredientes indicados' })
  @ApiResponse({ status: 200, description: 'Lista de recetas coincidentes' })
  async getByIngredients(
    @Request() req: { user: { id: string } },
    @Body() dto: GetRecipesByIngredientsDto,
  ) {
    return this.recipesService.findByIngredients(req.user.id, dto.ingredientIds);
  }

  @Post(':id/favorite')
  @ApiOperation({ summary: 'Alternar receta como favorita / no favorita' })
  @ApiParam({ name: 'id', description: 'ID de la receta' })
  @ApiResponse({ status: 200, description: 'Estado de favorito actualizado' })
  async toggleFavorite(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
  ) {
    return this.recipesService.toggleFavorite(req.user.id, id);
  }
}
