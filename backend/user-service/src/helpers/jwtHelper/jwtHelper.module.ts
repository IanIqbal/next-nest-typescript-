import { Module } from "@nestjs/common";
import { jwtHelperService } from "./jwtHelper.service";

@Module({
    imports:[],
    controllers:[],
    providers:[jwtHelperService],
    exports:[jwtHelperService]
})

export class jwtHelperModule{}

