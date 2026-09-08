import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiQuery, ApiParam } from '@nestjs/swagger';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';

@ApiTags('Ingredients')
@ApiBearerAuth('JWT-auth')
@Controller('api/ingredients')
@UseGuards(AuthGuard('jwt'))
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los ingredientes disponibles con filtros' })
  @ApiQuery({ name: 'query', required: false, description: 'Buscar por nombre' })
  @ApiQuery({ name: 'category', required: false, description: 'Filtrar por categoría' })
  @ApiQuery({ name: 'tag', required: false, description: 'Filtrar por tag' })
  @ApiResponse({ status: 200, description: 'Lista de ingredientes obtenida' })
  async getAll(
    @Request() req: { user: { id: string } },
    @Query('query') query?: string,
    @Query('category') category?: string,
    @Query('tag') tag?: string,
  ) {
    return this.ingredientsService.findAll(req.user.id, query, category, tag);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un ingrediente por ID' })
  @ApiParam({ name: 'id', description: 'ID del ingrediente' })
  @ApiResponse({ status: 200, description: 'Detalle del ingrediente encontrado' })
  @ApiResponse({ status: 404, description: 'Ingrediente no encontrado' })
  async getById(@Param('id') id: string) {
    return this.ingredientsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo ingrediente (soporta imagen de muestra)' })
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiResponse({ status: 201, description: 'Ingrediente creado con éxito' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req: { user: { id: string } },
    @Body() createIngredientDto: CreateIngredientDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.ingredientsService.create(req.user.id, createIngredientDto, file);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un ingrediente existente' })
  @ApiParam({ name: 'id', description: 'ID del ingrediente' })
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiResponse({ status: 200, description: 'Ingrediente actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ingrediente no encontrado' })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.ingredientsService.update(id, updateIngredientDto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ingrediente' })
  @ApiParam({ name: 'id', description: 'ID del ingrediente' })
  @ApiResponse({ status: 200, description: 'Ingrediente eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ingrediente no encontrado' })
  async remove(@Param('id') id: string) {
    return this.ingredientsService.remove(id);
  }
}
