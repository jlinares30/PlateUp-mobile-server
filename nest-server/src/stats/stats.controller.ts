import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatsService } from './stats.service';

@Controller('api/stats')
@UseGuards(AuthGuard('jwt'))
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getDashboardStats(@Request() req: { user: { id: string } }) {
    return this.statsService.getDashboardStats(req.user.id);
  }
}
