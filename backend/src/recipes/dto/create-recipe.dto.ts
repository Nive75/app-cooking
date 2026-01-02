import { IsString, IsOptional, IsInt, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  titre: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsInt()
  temps_preparation?: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  image_url?: string;
}

