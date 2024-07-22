import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm'; // Don't forget to import
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ActivityLogService } from '../activityLog/activityLog.service';
import { ActivityLog } from '../activityLog/activityLog.entity';
import { ActivityLogController } from '../activityLog/activityLog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, ActivityLog]), CloudinaryModule], // set new entity inside typeOrm array
  providers: [UserService, ActivityLogService],
  controllers: [UserController, ActivityLogController], // add new Service and controllers
  exports: [UserService, ActivityLogService], // need to export for auth module to work
})
export class UserModule {}
