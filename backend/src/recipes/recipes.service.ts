import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const args = { data: createRecipeDto };
    return this.prisma.recipe.create(args);
  }

  async findAll() {
    const args = {
      orderBy: {
        created_at: 'desc',
      },
    } as const;
    return this.prisma.recipe.findMany(args);
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

    const args = {
      where: { id },
      data: updateRecipeDto,
    };
    return this.prisma.recipe.update(args);
  }

  async remove(id: number) {
    const recipe = await this.findOne(id);

    const args = { where: { id } };
    return this.prisma.recipe.delete(args);
  }
}

