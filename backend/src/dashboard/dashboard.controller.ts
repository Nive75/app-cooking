import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  summary(@Query('date') date?: string) {
    return this.dashboardService.getSummary(date);
  }

  @Get('week')
  week(@Query('date') date?: string) {
    return this.dashboardService.getWeek(date);
  }
}


