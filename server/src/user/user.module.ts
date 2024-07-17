import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm'; // Don't forget to import
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ActivityLogService } from 'src/activityLog/activityLog.service';
import { ActivityLog } from 'src/activityLog/activityLog.entity';
import { ActivityLogController } from 'src/activityLog/activityLog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, ActivityLog]), CloudinaryModule], // set new entity inside typeOrm array
  providers: [UserService, ActivityLogService],
  controllers: [UserController, ActivityLogController], // add new Service and controllers
  exports: [UserService, ActivityLogService], // need to export for auth module to work
})
export class UserModule {}
