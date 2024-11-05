import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class ProductsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsString()
  @IsOptional()
  category: string;
}
