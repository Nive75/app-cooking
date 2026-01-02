import { IsString, IsOptional, IsInt, IsNotEmpty, IsDateString, IsIn } from 'class-validator';

export class CreateMealPlanDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['petit_dejeuner', 'dejeuner', 'diner', 'collation'])
  moment: string;

  @IsOptional()
  @IsInt()
  recipe_id?: number;

  @IsOptional()
  @IsString()
  note?: string;
}

