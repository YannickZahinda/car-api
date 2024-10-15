import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {CreateReportDto} from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGard } from 'src/gards/auth.gard';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Post()
    @UseGuards(AuthGard)
    createReport(@Body() body: CreateReportDto) {
        return this.reportsService.create(body);
    }
}
