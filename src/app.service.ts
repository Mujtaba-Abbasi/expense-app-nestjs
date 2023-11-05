import { Injectable } from '@nestjs/common';
import { ReportType, data } from './Data';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((item) => item.type === type);
  }

  getReportById(id: string) {
    const reportData = data.report.find((item) => item.id === id);

    return reportData || 'No records found with the provided Id';
  }

  createReport(
    reportType: ReportType,
    body: { amount: number; source: string; type: ReportType },
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

  updateReport(
    body: { amount: number; source: string; type: ReportType },
    id: string,
  ) {
    if (!id) return 'Id is required.';

    if (body.type !== ReportType.EXPENSE && body.type !== ReportType.INCOME)
      return 'Invalid Report type. Report type can either be income or expense.';

    const _data = data.report.find((item) => item.id === id);

    if (!_data) {
      return 'No Record found with the corresponding id';
    }
    const newReport = {
      ..._data,
      ...body,
    };

    data.report.push(newReport);

    return newReport;
  }

  deleteReport(id: string) {
    if (!id) return 'Id is required.';

    const reportData = data.report.find((item) => item.id === id);

    if (!reportData) {
      return 'No record found with the provided id.';
    }

    const newData = data.report.filter((item) => item.id !== id);

    data.report = [...newData];

    return 'Record was deleted successfully!';
  }
}
