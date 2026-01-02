import { IsString, IsOptional, IsBoolean, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateShoppingItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nom: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  quantite?: string;

  @IsOptional()
  @IsBoolean()
  coche?: boolean;
}

