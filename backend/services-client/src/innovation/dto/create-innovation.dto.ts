import { IsString, IsBoolean, IsNotEmpty, isInt, IsInt } from 'class-validator';
export class CreateInnovationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  coverUrl: string;

  @IsNotEmpty()
  @IsString()
  backgroundStory: string;

  @IsNotEmpty()
  @IsBoolean()
  isJoinable: boolean;

  @IsNotEmpty()
  @IsString()
  whyAnswer: string;

  @IsNotEmpty()
  @IsString()
  howAnswer: string;

  @IsNotEmpty()
  @IsString()
  whatAnswer: string;
}