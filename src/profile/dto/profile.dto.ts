import {
  IsArray,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Male', 'Female'])
  gender: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @IsNumberString()
  @IsNotEmpty()
  height: number;

  @IsNumberString()
  @IsNotEmpty()
  weight: number;

  @IsArray()
  interests: string[];

  @IsFile()
  @IsNotEmpty()
  @HasMimeType(['image/jpeg', 'image/png'])
  profilePicture: MemoryStoredFile;
}
