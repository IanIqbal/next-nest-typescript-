import { Injectable } from '@nestjs/common';
import { CreateInnovationDto } from './dto/create-innovation.dto';
import { UpdateInnovationDto } from './dto/update-innovation.dto';
import { Repository } from 'typeorm';
import { Innovation } from './entities/innovation.entity';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class InnovationService {
  constructor(
    @InjectRepository(Innovation) private readonly innovationRepository: Repository<Innovation>,
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>
  ) { }
  async createInnovation(innovationData: { createInnovationDto: CreateInnovationDto, userId: number }) {
    try {

      console.log(innovationData.createInnovationDto);
      let createdInnovation = await this.innovationRepository.save(innovationData.createInnovationDto)

      let createTeamDto = new CreateTeamDto()
      createTeamDto.userId = innovationData.userId
      createTeamDto.innovationId = createdInnovation.id
      createTeamDto.teamRole = "founder"
      let createdTeam = await this.teamRepository.save(createTeamDto)
      return { createdInnovation, createdTeam }
    } catch (error) {
      console.log(error);

      return error
    }
  }

  async findAll() {
    try {
      let innovations = await this.innovationRepository.findAndCount({
        order: { id: "DESC" },
        skip: 0,
        take: 5
      })
      console.log(innovations);

      return innovations
    } catch (error) {
      console.log(error);

    }
  }

  async findOne(id: number) {
    try {
      console.log("findone service");
      let innovation = await this.innovationRepository.find({
        where: {
          id
        },
        relations: {
          teams: true
        }
      })

      return innovation[0]

    } catch (error) {

    }
  }

  async update(innovationData: { updateInnovationDto: UpdateInnovationDto, innovationId: number }) {
    try {
      let checkInnovation = await this.innovationRepository.findBy({ id: innovationData.innovationId })
      console.log(checkInnovation);

      await this.innovationRepository.update(checkInnovation[0].id, innovationData.updateInnovationDto)

      return {
        message: `Success edit innovation id ${checkInnovation[0].id}`,
        statusCode: 201
      };

    } catch (error) {
      console.log(error);
      
    }
  }

  async softDel(innovationId:number){
    try {

      let checkInnovation = await this.innovationRepository.findBy({ id: innovationId})

      await this.innovationRepository.update(checkInnovation[0].id, {status:"unavailable"})
      return {
        message:`Success delete innovation id ${checkInnovation[0].id}`,
        statusCode:201
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  remove(id: number) {
    return `This action removes a #${id} innovation`;
  }

  testInnovation() {
    return "test innovation microservice succes"
  }
}
