import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  async create(createIngredientDto: CreateIngredientDto) {
    return this.prisma.ingredient.create({
      data: createIngredientDto,
    });
  }

  async findAll(search?: string) {
    const where: any = {};

    if (search) {
      where.nom = { contains: search };
    }

    return this.prisma.ingredient.findMany({
      where,
      orderBy: {
        nom: 'asc',
      },
      include: {
        _count: {
          select: {
            recipeIngredients: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
      include: {
        recipeIngredients: {
          include: {
            recipe: {
              select: {
                id: true,
                titre: true,
                image_url: true,
              },
            },
          },
        },
      },
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }

    return ingredient;
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    await this.findOne(id);

    return this.prisma.ingredient.update({
      where: { id },
      data: updateIngredientDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.ingredient.delete({
      where: { id },
    });
  }
}
