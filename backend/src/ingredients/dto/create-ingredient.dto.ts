import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';

const MAX_NAME_LENGTH = 255;
const MAX_UNIT_LENGTH = 50;

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_NAME_LENGTH)
  nom: string;

  @IsOptional()
  @IsString()
  @MaxLength(MAX_UNIT_LENGTH)
  unite?: string;
}
