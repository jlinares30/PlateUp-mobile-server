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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { MealPlansService } from './meal-plans.service';
import { CreateMealPlanDto, UpdateMealPlanDto, CloneMealPlanDto } from './dto/meal-plan.dto';

@ApiTags('Meal Plans')
@ApiBearerAuth('JWT-auth')
@Controller('api/meal-plans')
@UseGuards(AuthGuard('jwt'))
export class MealPlansController {
  constructor(private readonly mealPlansService: MealPlansService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los planes de comidas públicos' })
  @ApiResponse({ status: 200, description: 'Lista de planes públicos obtenida' })
  async getAllPublic(@Request() req: { user: { id: string } }) {
    return this.mealPlansService.findAllPublic(req.user.id);
  }

  @Get('my')
  @ApiOperation({ summary: 'Obtener los planes de comidas creados o activos del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de planes del usuario' })
  async getMy(@Request() req: { user: { id: string } }) {
    return this.mealPlansService.findMy(req.user.id);
  }

  @Post('clone')
  @ApiOperation({ summary: 'Clonar un plan de comidas público a la cuenta del usuario' })
  @ApiResponse({ status: 201, description: 'Plan clonado exitosamente' })
  @ApiResponse({ status: 404, description: 'Plan origen no encontrado' })
  async clone(
    @Request() req: { user: { id: string } },
    @Body() dto: CloneMealPlanDto,
  ) {
    return this.mealPlansService.clone(req.user.id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un plan de comidas por ID' })
  @ApiParam({ name: 'id', description: 'ID del plan de comidas' })
  @ApiResponse({ status: 200, description: 'Detalle del plan obtenido' })
  @ApiResponse({ status: 404, description: 'Plan no encontrado' })
  async getById(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
  ) {
    return this.mealPlansService.findById(req.user.id, id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo plan de comidas (soporta imagen de portada)' })
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiResponse({ status: 201, description: 'Plan de comidas creado exitosamente' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req: { user: { id: string } },
    @Body() dto: CreateMealPlanDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.mealPlansService.create(req.user.id, dto, file);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un plan de comidas existente' })
  @ApiParam({ name: 'id', description: 'ID del plan' })
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiResponse({ status: 200, description: 'Plan actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Plan no encontrado' })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
    @Body() dto: UpdateMealPlanDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.mealPlansService.update(req.user.id, id, dto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un plan de comidas' })
  @ApiParam({ name: 'id', description: 'ID del plan' })
  @ApiResponse({ status: 200, description: 'Plan eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Plan no encontrado' })
  async remove(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
  ) {
    return this.mealPlansService.remove(req.user.id, id);
  }
}
