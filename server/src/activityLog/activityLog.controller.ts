import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ActivityLogService } from './activityLog.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ActivityLog } from './activityLog.entity';

@Controller('user/:id/activity')
@UseGuards(AuthGuard, RolesGuard)
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Get()
  @Roles('admin', 'user')
  async getActivityLogs(@Param('id', ParseIntPipe) id: number): Promise<ActivityLog[]> {
    return this.activityLogService.getActivityLogs(id);
  }

  @Get()
  @Roles('admin', 'user')
  async exportActivityLogs(@Param('id', ParseIntPipe) id: number): Promise<ActivityLog[]> {
    return this.activityLogService.exportActivityLogs(id);
  }
}
