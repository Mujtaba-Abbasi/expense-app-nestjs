import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { ReportModule } from 'src/report/report.module';

@Module({
  controllers: [SummaryController],
  providers: [SummaryService],
  imports: [ReportModule],
})
export class SummaryModule {}
