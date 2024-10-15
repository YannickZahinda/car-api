import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {CreateReportDto} from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGard } from 'src/gards/auth.gard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Post()
    @UseGuards(AuthGard)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }
}
