import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLog } from './activityLog.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private activityLogRepository: Repository<ActivityLog>,
  ) {}

  async logActivity(user: User, activity: string) {
    const activityLog = this.activityLogRepository.create({ user, activity });
    await this.activityLogRepository.save(activityLog);
  }

  async getActivityLogs(userId: number): Promise<ActivityLog[]> {
    return this.activityLogRepository.find({
      where: {
        user: { id: userId },
      },
      order: {
        timestamp: 'DESC',
      },
      take: 15,
    });
  }

  async exportActivityLogs(userId: number): Promise<ActivityLog[]> {
    return this.activityLogRepository.find({
      where: {
        user: { id: userId },
      },
      order: {
        timestamp: 'DESC',
      },
    });
  }
}
