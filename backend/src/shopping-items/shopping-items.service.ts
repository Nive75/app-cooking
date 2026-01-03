import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShoppingItemDto } from './dto/create-shopping-item.dto';
import { UpdateShoppingItemDto } from './dto/update-shopping-item.dto';

@Injectable()
export class ShoppingItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createShoppingItemDto: CreateShoppingItemDto) {
    return this.prisma.shoppingItem.create({
      data: createShoppingItemDto,
    });
  }

  async findAll() {
    return this.prisma.shoppingItem.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findUnchecked() {
    return this.prisma.shoppingItem.findMany({
      where: {
        coche: false,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
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
    await this.findOne(id);

    return this.prisma.shoppingItem.update({
      where: { id },
      data: updateShoppingItemDto,
    });
  }

  async toggleCheck(id: number) {
    const shoppingItem = await this.findOne(id);

    return this.prisma.shoppingItem.update({
      where: { id },
      data: {
        coche: !shoppingItem.coche,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.shoppingItem.delete({
      where: { id },
    });
  }

  async removeChecked() {
    return this.prisma.shoppingItem.deleteMany({
      where: {
        coche: true,
      },
    });
  }
}

