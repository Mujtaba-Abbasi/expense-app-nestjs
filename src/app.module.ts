import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SummaryModule } from './summary/summary.module';
import { ReportService } from './report/report.service';
import { ReportController } from './report/report.controller';
import { ReportModule } from './report/report.module';

@Module({
  imports: [SummaryModule, ReportModule],
  controllers: [AppController, ReportController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    ReportService,
  ],
})
export class AppModule {}
