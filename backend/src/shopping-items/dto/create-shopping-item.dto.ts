import { IsString, IsOptional, IsBoolean, IsNotEmpty, MaxLength } from 'class-validator';

const MAX_NAME_LENGTH = 255;

export class CreateShoppingItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_NAME_LENGTH)
  nom: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  quantite?: string;

  @IsOptional()
  @IsBoolean()
  coche?: boolean;
}

