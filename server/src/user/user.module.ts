import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ActivityLogService } from '../activityLog/activityLog.service';
import { ActivityLog } from '../activityLog/activityLog.entity';
import { ActivityLogController } from '../activityLog/activityLog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, ActivityLog]), CloudinaryModule],
  providers: [UserService, ActivityLogService],
  controllers: [UserController, ActivityLogController],
  exports: [UserService, ActivityLogService],
})
export class UserModule {}
