import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  create(input: CreateReportDto, user) {
    const report = this.reportsRepository.create();
    Object.assign(report, input);
    report.user = user;

    return this.reportsRepository.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportsRepository.findOne({ where: { id } });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;

    return this.reportsRepository.save(report);
  }

  createEstimate({ make, model, lng, lat, year, mileage }) {
    return this.reportsRepository
      .createQueryBuilder('report')
      .select('AVG(report.price)', 'price')
      .where('report.make = :make', { make })
      .andWhere('report.model = :model', { model })
      .andWhere('report.year = :year', { year })
      .andWhere('report.lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('report.lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('report.approved IS TRUE')
      .orderBy('ABS(report.mileage - :mileage)')
      .setParameters({ mileage })
      .limit(3)
      .getRawMany();
  }
}
