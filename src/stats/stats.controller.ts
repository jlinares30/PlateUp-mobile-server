import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StatsService } from './stats.service';

@ApiTags('Stats')
@ApiBearerAuth('JWT-auth')
@Controller('api/stats')
@UseGuards(AuthGuard('jwt'))
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener métricas y estadísticas del dashboard del usuario' })
  @ApiResponse({ status: 200, description: 'Estadísticas del dashboard calculadas' })
  async getDashboardStats(@Request() req: { user: { id: string } }) {
    return this.statsService.getDashboardStats(req.user.id);
  }
}
