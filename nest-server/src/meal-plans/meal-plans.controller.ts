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
import { MealPlansService } from './meal-plans.service';
import { CreateMealPlanDto, UpdateMealPlanDto, CloneMealPlanDto } from './dto/meal-plan.dto';

@Controller('api/meal-plans')
@UseGuards(AuthGuard('jwt'))
export class MealPlansController {
  constructor(private readonly mealPlansService: MealPlansService) {}

  @Get()
  async getAllPublic(@Request() req: { user: { id: string } }) {
    return this.mealPlansService.findAllPublic(req.user.id);
  }

  @Get('my')
  async getMy(@Request() req: { user: { id: string } }) {
    return this.mealPlansService.findMy(req.user.id);
  }

  @Post('clone')
  async clone(
    @Request() req: { user: { id: string } },
    @Body() dto: CloneMealPlanDto,
  ) {
    return this.mealPlansService.clone(req.user.id, dto);
  }

  @Get(':id')
  async getById(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
  ) {
    return this.mealPlansService.findById(req.user.id, id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() req: { user: { id: string } },
    @Body() dto: CreateMealPlanDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.mealPlansService.create(req.user.id, dto, file);
  }

  @Put(':id')
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
  async remove(
    @Request() req: { user: { id: string } },
    @Param('id') id: string,
  ) {
    return this.mealPlansService.remove(req.user.id, id);
  }
}
