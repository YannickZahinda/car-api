import { Body, 
    Controller, 
    Post, 
    UseGuards,
    Patch, 
    Param} from '@nestjs/common';
import {CreateReportDto} from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGard } from 'src/gards/auth.gard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @Post()
    @UseGuards(AuthGard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto){
        return this.reportsService.changeApproval(parseInt(id), body.approved)
    }
}
