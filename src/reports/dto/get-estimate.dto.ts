import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  mileage: number;
}
