import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType } from './Data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(@Param('id') id: string) {
    return this.appService.getReportById(id);
  }

  @Post()
  createReport(
    @Body() body: { amount: number; source: string; type: ReportType },
    @Param('type') reportType: string,
  ) {
    const type =
      reportType === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.createReport(type, body);
  }

  @Put(':id')
  updateReport(
    @Body() body: { amount: number; source: string; type: ReportType },
    @Param('id') id: string,
  ) {
    return this.appService.updateReport(body, id);
  }

  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.appService.deleteReport(id);
  }
}
