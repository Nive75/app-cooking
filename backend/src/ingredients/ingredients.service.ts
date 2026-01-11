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

  async findAll(filters?: {
    search?: string;
    sans_lactose?: boolean;
    sans_gluten?: boolean;
    riche_proteines?: boolean;
    riche_fibres?: boolean;
    riche_vitamines?: boolean;
  }) {
    const where: any = {};

    if (filters?.search) {
      where.nom = { contains: filters.search };
    }

    // Filtres nutritionnels
    if (filters?.sans_lactose === true) {
      where.sans_lactose = true;
    }

    if (filters?.sans_gluten === true) {
      where.sans_gluten = true;
    }

    if (filters?.riche_proteines === true) {
      where.riche_proteines = true;
    }

    if (filters?.riche_fibres === true) {
      where.riche_fibres = true;
    }

    if (filters?.riche_vitamines === true) {
      where.riche_vitamines = true;
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
