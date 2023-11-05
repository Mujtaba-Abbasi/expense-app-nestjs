import { Controller, Get } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly appService: SummaryService) {}

  @Get()
  calculateSummary() {
    return this.appService.calculateSummary();
  }
}
