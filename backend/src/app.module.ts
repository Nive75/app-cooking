import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { MealPlanModule } from './meal-plan/meal-plan.module';
import { ShoppingItemsModule } from './shopping-items/shopping-items.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [RecipesModule, MealPlanModule, ShoppingItemsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
