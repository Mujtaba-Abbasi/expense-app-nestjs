import { Injectable } from '@nestjs/common';
import { ReportType, data } from './Data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from './dtos/report.dto';

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report
      .filter((item) => item.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(id: string) {
    const reportData = data.report.find((item) => item.id === id);

    return (
      new ReportResponseDto(reportData) ||
      'No records found with the provided Id'
    );
  }

  createReport(
    reportType: ReportType,
    body: { amount: number; source: string; type: ReportType },
  ) {
    const { amount, source } = body;

    const newReport = {
      id: uuid() as string,
      source,
      amount,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: reportType === 'expense' ? ReportType.EXPENSE : ReportType.INCOME,
    };

    data.report.push(newReport);

    return new ReportResponseDto(newReport);
  }

  updateReport(
    body: { amount: number; source: string; type: ReportType },
    id: string,
  ) {
    const _data = data.report.find((item) => item.id === id);

    if (!_data) {
      return 'No Record found with the corresponding id';
    }
    const newReport = {
      ..._data,
      ...body,
    };

    data.report.push(newReport);

    return new ReportResponseDto(newReport);
  }

  deleteReport(id: string) {
    const reportData = data.report.find((item) => item.id === id);

    if (!reportData) {
      return 'No record found with the provided id.';
    }

    const newData = data.report.filter((item) => item.id !== id);

    data.report = [...newData];

    return 'Record was deleted successfully!';
  }
}
