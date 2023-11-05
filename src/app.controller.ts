import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType, data } from './Data';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((item) => item.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const reportData = data.report
      .filter((item) => item.type === reportType)
      .find((item) => item.id === id);

    return reportData || 'No records found with the provided Id';
  }

  @Post()
  createReport(
    @Body() body: { amount: number; source: string; type: ReportType },
    @Param('type') reportType: string,
  ) {
    const { amount, source, type } = body;

    if (!amount) return 'Amount is required.';
    if (!source) return 'Source is required.';
    if (!type) return 'Amount is required.';

    if (type !== ReportType.EXPENSE && type !== ReportType.INCOME)
      return 'Invalid Report type. Report type can either be income or expense.';

    const newReport = {
      id: uuid() as string,
      source,
      amount,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: reportType === 'expense' ? ReportType.EXPENSE : ReportType.INCOME,
    };

    data.report.push(newReport);

    return newReport;
  }

  @Put(':id')
  updateReport(
    @Body() body: { amount: number; source: string; type: ReportType },
    @Param('type') reportType: string,
    @Param('id') id: string,
  ) {
    const { type } = body;

    if (!id) return 'Id is required.';
    if (type !== ReportType.EXPENSE && type !== ReportType.INCOME)
      return 'Invalid Report type. Report type can either be income or expense.';

    const _data = data.report.find((item) => item.id === id);

    if (_data) {
      const newReport = {
        ..._data,
        ...body,
      };

      data.report.push(newReport);

      return newReport;
    } else return 'No Record found with the corresponding id';
  }

  @Delete(':id')
  deleteReport(@Param('type') type: string, @Param('id') id: string) {
    if (!id) return 'Id is required.';
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const reportData = data.report
      .filter((item) => item.type === reportType)
      .find((item) => item.id === id);

    if (reportData) {
      const newData = data.report.filter((item) => item.id !== id);
      data.report = [...newData];

      return 'Record was deleted successfully!';
    } else return 'No record found with the provided id.';
  }
}
