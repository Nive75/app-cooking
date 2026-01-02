import { IsString, IsOptional, IsInt, IsNotEmpty, MaxLength } from 'class-validator';

const MAX_TITLE_LENGTH = 255;

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_TITLE_LENGTH)
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

