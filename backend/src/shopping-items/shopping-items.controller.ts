import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ShoppingItemsService } from './shopping-items.service';
import { CreateShoppingItemDto } from './dto/create-shopping-item.dto';
import { UpdateShoppingItemDto } from './dto/update-shopping-item.dto';

@Controller('shopping-items')
export class ShoppingItemsController {
  constructor(private readonly shoppingItemsService: ShoppingItemsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createShoppingItemDto: CreateShoppingItemDto) {
    return this.shoppingItemsService.create(createShoppingItemDto);
  }

  @Get()
  findAll(@Query('unchecked') unchecked?: string) {
    if (unchecked === 'true') {
      return this.shoppingItemsService.findUnchecked();
    }
    return this.shoppingItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingItemsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShoppingItemDto: UpdateShoppingItemDto,
  ) {
    return this.shoppingItemsService.update(id, updateShoppingItemDto);
  }

  @Patch(':id/toggle')
  toggleCheck(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingItemsService.toggleCheck(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shoppingItemsService.remove(id);
  }

  @Delete('checked/all')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeChecked() {
    return this.shoppingItemsService.removeChecked();
  }
}

