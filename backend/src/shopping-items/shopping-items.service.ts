import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShoppingItemDto } from './dto/create-shopping-item.dto';
import { UpdateShoppingItemDto } from './dto/update-shopping-item.dto';

@Injectable()
export class ShoppingItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createShoppingItemDto: CreateShoppingItemDto) {
    const args = { data: createShoppingItemDto };
    return this.prisma.shoppingItem.create(args);
  }

  async findAll() {
    const args = {
      orderBy: {
        created_at: 'desc',
      },
    } as const;
    return this.prisma.shoppingItem.findMany(args);
  }

  async findUnchecked() {
    const args = {
      where: {
        coche: false,
      },
      orderBy: {
        created_at: 'desc',
      },
    } as const;
    return this.prisma.shoppingItem.findMany(args);
  }

  async findOne(id: number) {
    const shoppingItem = await this.prisma.shoppingItem.findUnique({
      where: { id },
    });

    if (!shoppingItem) {
      throw new NotFoundException(`ShoppingItem with ID ${id} not found`);
    }

    return shoppingItem;
  }

  async update(id: number, updateShoppingItemDto: UpdateShoppingItemDto) {
    const shoppingItem = await this.findOne(id);

    const args = {
      where: { id },
      data: updateShoppingItemDto,
    };
    return this.prisma.shoppingItem.update(args);
  }

  async toggleCheck(id: number) {
    const shoppingItem = await this.findOne(id);

    const args = {
      where: { id },
      data: {
        coche: !shoppingItem.coche,
      },
    };
    return this.prisma.shoppingItem.update(args);
  }

  async remove(id: number) {
    const shoppingItem = await this.findOne(id);

    const args = { where: { id } };
    return this.prisma.shoppingItem.delete(args);
  }

  async removeChecked() {
    const args = {
      where: {
        coche: true,
      },
    };
    return this.prisma.shoppingItem.deleteMany(args);
  }
}

