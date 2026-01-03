import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // Optional query param for debugging: ?date=YYYY-MM-DD
  @Get('summary')
  summary(@Query('date') date?: string) {
    return this.dashboardService.getSummary(date);
  }
}


