import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto) {
    return this.prisma.recipe.create({
      data: createRecipeDto,
    });
  }

  async findAll() {
    return this.prisma.recipe.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        mealPlans: true,
      },
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.findOne(id);

    return this.prisma.recipe.update({
      where: { id },
      data: updateRecipeDto,
    });
  }

  async remove(id: number) {
    const recipe = await this.findOne(id);

    return this.prisma.recipe.delete({
      where: { id },
    });
  }
}

