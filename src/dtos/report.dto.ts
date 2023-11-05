import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ReportType } from 'src/Data';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsEnum(ReportType, {
    message: 'Invalid type. Type must either be income or expense.',
  })
  @IsNotEmpty()
  @IsString()
  type: ReportType;
}

export class UpdateReportDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number;

  @IsOptional()
  @IsEnum(ReportType, {
    message: 'Invalid type. Type must either be income or expense.',
  })
  type: ReportType;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;

  @Exclude()
  createdAt: Date;

  @Expose({ name: 'created_at' })
  transformCreatedAt() {
    return this.createdAt;
  }

  @Exclude()
  updatedAt: Date;
  type: ReportType;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
