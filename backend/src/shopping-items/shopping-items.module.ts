import { Module } from '@nestjs/common';
import { ShoppingItemsController } from './shopping-items.controller';
import { ShoppingItemsService } from './shopping-items.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ShoppingItemsController],
  providers: [ShoppingItemsService, PrismaService],
  exports: [ShoppingItemsService],
})
export class ShoppingItemsModule {}

