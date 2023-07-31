import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { ReportDto } from './dto/report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() input: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(input, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard, AdminGuard)
  approveReport(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: ApproveReportDto,
  ) {
    return this.reportsService.changeApproval(id, input.approved);
  }

  @Get()
  getEstimate(@Query() input: GetEstimateDto) {
    return this.reportsService.createEstimate(input);
  }
}
