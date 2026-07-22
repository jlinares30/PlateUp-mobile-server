import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingListController } from './shopping-list.controller';
import { ShoppingListService } from './shopping-list.service';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ShoppingListController],
  providers: [ShoppingListService],
  exports: [ShoppingListService],
})
export class ShoppingListModule {}
