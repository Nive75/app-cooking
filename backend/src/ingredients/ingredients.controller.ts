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
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('sans_lactose') sansLactose?: string,
    @Query('sans_gluten') sansGluten?: string,
    @Query('riche_proteines') richeProteines?: string,
    @Query('riche_fibres') richeFibres?: string,
    @Query('riche_vitamines') richeVitamines?: string,
  ) {
    return this.ingredientsService.findAll({
      search,
      sans_lactose: sansLactose === 'true',
      sans_gluten: sansGluten === 'true',
      riche_proteines: richeProteines === 'true',
      riche_fibres: richeFibres === 'true',
      riche_vitamines: richeVitamines === 'true',
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientsService.remove(id);
  }
}
