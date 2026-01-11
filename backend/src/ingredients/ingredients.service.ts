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

    const nutritionalFilters = [
      { key: 'sans_lactose', prop: 'sans_lactose' },
      { key: 'sans_gluten', prop: 'sans_gluten' },
      { key: 'riche_proteines', prop: 'riche_proteines' },
      { key: 'riche_fibres', prop: 'riche_fibres' },
      { key: 'riche_vitamines', prop: 'riche_vitamines' },
    ];

    nutritionalFilters.forEach(filter => {
      if (filters?.[filter.prop] === true) {
        where[filter.prop] = true;
      }
    });

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
    const selectFields = {
      id: true,
      titre: true,
      image_url: true,
    };
    const includeConfig = {
      recipeIngredients: {
        include: {
          recipe: {
            select: selectFields,
          },
        },
      },
    };
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
      include: includeConfig,
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
