import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { RecordsModule } from './records/records.module';
import { CommentsModule } from './comments/comments.module';
import { UserDoctorModule } from './user_doctor/user-doctor.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    FilesModule,
    ServeStaticModule.forRoot({
      serveRoot: '/avatars',
      rootPath: path.resolve(__dirname, '..', '..', 'static', 'avatars')
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/images',
      rootPath: path.join(__dirname, '..', '..', 'static', 'images')
    }),
   
    CommentsModule,
    RecordsModule,
    UserDoctorModule
  ]
})
export class AppModule {}
