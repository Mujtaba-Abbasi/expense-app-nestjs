import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from './Data';
import { AppService } from './app.service';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto | string {
    return this.appService.getReportById(id);
  }

  @Post()
  createReport(
    @Body() body: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) reportType: string,
  ): ReportResponseDto {
    const type =
      reportType === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.createReport(type, body);
  }

  @Put(':id')
  updateReport(
    @Body() body: UpdateReportDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto | string {
    return this.appService.updateReport(body, id);
  }

  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string): string {
    return this.appService.deleteReport(id);
  }
}
