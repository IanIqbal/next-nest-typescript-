import { IsNumber, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  teamRole:string;
  
  @IsNotEmpty()
  @IsNumber()
  innovationId:number; 
}