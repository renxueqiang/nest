import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AppService2 } from './app.service2';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [UserModule,ConfigModule.forRoot({
    path: '/ren'
  })],
  controllers: [AppController],
  providers: [
    {
      provide: 'Ren',
      useClass: AppService,
    },
    {
      provide: 'JD',
      useValue: ['TB', 'PDD', 'JD'],
    },
    {
      provide: 'Ren2',
      useClass: AppService2,
    },

    AppService2,
    {
      provide: "Ren2",
      inject: [AppService2],
      useFactory(UserService2: AppService2) {
        return new AppService2()
  
      }}
  ],
})
export class AppModule {}
